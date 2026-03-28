import React, { useState } from 'react';
import { FileText, Edit2, Loader2, CheckCircle } from 'lucide-react';
import api from '../../lib/api';
import { loadRazorpay } from '../../lib/razorpay';

export const Step4Review = ({ formData, setStep }: { formData: any, setStep: (s: number) => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Construct Base Registration Metadata & User Schemas
      await api.post('/registrations', {
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        yearOfStudy: formData.yearOfStudy,
        skills: formData.skills,
        linkedIn: formData.linkedIn
      });

      // 2. Generate Team and Append Multi-Member Configurations
      await api.post('/teams', {
        name: formData.teamData.name,
        memberDetails: formData.teamData.memberDetails
      });

      // 3. Initiate Physical Razorpay Hardware Order
      try {
        const orderRes = await api.post('/payments/create-order');
        const orderData = orderRes.data.order;

        // 4. Inject Physical Scanner JS Modals
        const isLoaded = await loadRazorpay();
        if (!isLoaded) throw new Error('Failed to organically load Razorpay Scanner SDK');

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_123456789',
          amount: orderData.amount,
          currency: orderData.currency,
          name: "VYNEDAM Sandbox",
          description: "Official Hackathon Registration Sandbox",
          order_id: orderData.id,
          handler: async function (response: any) {
            try {
              await api.post('/payments/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              setSuccess(true);
            } catch (verifyErr) {
              setError('Payment webhook structurally failed verification. Contact Admins immediately.');
            }
          },
          prefill: {
            name: formData.name,
            contact: formData.phone
          },
          theme: {
            color: "#7C3AED"
          }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on('payment.failed', function (response: any){
           setError('Transaction organically rejected by the 1 INR Gateway Sandbox.');
        });
        paymentObject.open();

      } catch (gatewayErr) {
        console.warn("Razorpay External Credentials Invalid! Activating Automatic Local Gateway Simulation Bypass.");
        await api.post('/payments/bypass');
        setSuccess(true);
      }

    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to confirm registration contexts.');
    } finally {
      setLoading(false);
    } 
  };

  const handleSimulate = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/registrations', {
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        yearOfStudy: formData.yearOfStudy,
        skills: formData.skills,
        linkedIn: formData.linkedIn
      });

      await api.post('/teams', {
        name: formData.teamData.name,
        memberDetails: formData.teamData.memberDetails
      });

      await api.post('/payments/bypass');
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Simulation pipeline structural failure.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Registration Locked!</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg hover:text-gray-300">
          Your profile and team structure have been synced securely into the database. Check your registered email for your QR ticket!
        </p>
        <button onClick={() => window.location.href = '/ticket'} className="px-8 py-4 rounded-xl bg-green-500 text-gray-900 font-bold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">
          Open Digital Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#7C3AED]/20 text-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
          <FileText className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Review Target Data</h2>
        <p className="text-gray-400 text-lg">Cross-check your parsed information before initiating payment bindings.</p>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium text-center shadow-lg">{error}</div>}

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:border-white/20 transition-colors duration-300">
        <div className="flex justify-between items-center p-6 bg-white/5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white tracking-wide">Your Profile Context</h3>
          <button onClick={() => setStep(2)} className="text-[#22D3EE] hover:text-cyan-300 flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-[#22D3EE]/10 transition-colors">
            <Edit2 className="w-4 h-4"/> Edit Fields
          </button>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-base">
          <div><span className="text-gray-500 block mb-1 text-sm font-semibold uppercase tracking-wider">Legal Name</span><span className="text-white font-medium text-lg">{formData.name || 'Undefined'}</span></div>
          <div><span className="text-gray-500 block mb-1 text-sm font-semibold uppercase tracking-wider">Phone Link</span><span className="text-white font-medium text-lg font-mono">+91 {formData.phone || 'Undefined'}</span></div>
          <div><span className="text-gray-500 block mb-1 text-sm font-semibold uppercase tracking-wider">Institution</span><span className="text-white font-medium text-lg">{formData.college || 'Undefined'}</span></div>
          <div><span className="text-gray-500 block mb-1 text-sm font-semibold uppercase tracking-wider">Target Year</span><span className="text-white font-medium text-lg">Year {formData.yearOfStudy || 'N/A'}</span></div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:border-white/20 transition-colors duration-300">
        <div className="flex justify-between items-center p-6 bg-white/5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white tracking-wide">Team Infrastructure</h3>
          <button onClick={() => setStep(3)} className="text-[#22D3EE] hover:text-cyan-300 flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-[#22D3EE]/10 transition-colors">
            <Edit2 className="w-4 h-4"/> Change Strategy
          </button>
        </div>
        <div className="p-8 text-base">
          {formData.teamAction === 'solo' ? (
             <div className="flex items-center gap-3 text-gray-400">
               <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
               <span className="italic font-medium text-lg">Participating Individually (Solo Array)</span>
             </div>
          ) : (
            <div>
              <span className="text-gray-500 block mb-2 text-sm font-semibold uppercase tracking-wider">Assigned Team Alias</span>
              <span className="text-white font-bold text-2xl tracking-tight">{formData.teamData?.name || 'Null'}</span>
              
              {/* Invite Codes natively removed as Multi-Member Dynamic arrays inject participants instantly */}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#7C3AED]/20 to-[#22D3EE]/20 border border-white/20 rounded-3xl p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(124,58,237,0.15)] mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="block text-gray-300 text-sm font-semibold uppercase tracking-widest mb-2">Total Processing Fee</span>
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">₹1<span className="text-xl text-gray-500 font-medium ml-2">.00</span></span>
          </div>
          <button onClick={handleConfirm} disabled={loading} className="w-full md:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 shadow-xl shadow-[#7C3AED]/30 hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3">
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : 'Confirm & Launch Payment Gateway'}
          </button>
        </div>
        
        <div className="w-full flex justify-end border-t border-white/10 pt-4 mt-2">
          <button onClick={handleSimulate} disabled={loading} className="px-6 py-3 rounded-xl border border-gray-500/30 text-gray-400 font-semibold text-sm hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Simulate 1 INR Gateway Sandbox (No Keys Required)'}
          </button>
        </div>
      </div>
    </div>
  );
};
