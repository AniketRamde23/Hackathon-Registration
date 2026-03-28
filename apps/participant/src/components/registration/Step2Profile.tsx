import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number. Must be exactly 10 digits.'),
  college: z.string().min(2, 'College name is required'),
  yearOfStudy: z.string().min(1, 'Please select a specific year'),
  skills: z.string().min(2, 'Please enter at least one skill'),
  linkedIn: z.string().optional(),
  agreedToTerms: z.literal(true, { errorMap: () => ({ message: 'You must explicitly agree to the terms to proceed' }) })
});

type ProfileForm = z.infer<typeof profileSchema>;

export const Step2Profile = ({ onNext, updateData, initialData }: { onNext: () => void, updateData: (d: any) => void, initialData: any }) => {
  const { user } = useAuth();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || user?.displayName || '',
      phone: initialData.phone || '',
      college: initialData.college || '',
      yearOfStudy: initialData.yearOfStudy || '',
      skills: initialData.skills || '',
      linkedIn: initialData.linkedIn || '',
      agreedToTerms: initialData.agreedToTerms || false,
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      updateData(data);
      onNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
        <input {...register('name')} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow" placeholder="John Doe" />
        {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address (Read-Only via OAuth)</label>
        <input value={user?.email || ''} readOnly className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
        <div className="flex">
          <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-400 font-mono">+91</span>
          <input {...register('phone')} className="flex-1 bg-[#0B0F19] border border-white/10 rounded-r-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow font-mono tracking-widest" placeholder="9876543210" maxLength={10} />
        </div>
        {errors.phone && <p className="text-red-400 text-xs mt-2 font-medium">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">College / University</label>
          <input {...register('college')} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow" placeholder="Institute Name" />
          {errors.college && <p className="text-red-400 text-xs mt-2 font-medium">{errors.college.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Year of Study</label>
          <select {...register('yearOfStudy')} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none appearance-none transition-shadow cursor-pointer">
            <option value="">Select current year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Fourth Year</option>
            <option value="5">Postgrad / Other</option>
          </select>
          {errors.yearOfStudy && <p className="text-red-400 text-xs mt-2 font-medium">{errors.yearOfStudy.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Technical Skills (comma separated lists)</label>
        <input {...register('skills')} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow" placeholder="React, Node.js, Python, Figma, Cloud architecture" />
        {errors.skills && <p className="text-red-400 text-xs mt-2 font-medium">{errors.skills.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile URL (Optional)</label>
        <input {...register('linkedIn')} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow" placeholder="https://linkedin.com/in/username" />
        {errors.linkedIn && <p className="text-red-400 text-xs mt-2 font-medium">{errors.linkedIn.message}</p>}
      </div>

      <div className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10 mt-8">
        <div className="flex items-center h-5 mt-1">
          <input id="terms" type="checkbox" {...register('agreedToTerms')} className="w-5 h-5 bg-[#0B0F19] border-white/20 text-[#7C3AED] rounded focus:ring-[#7C3AED] cursor-pointer" />
        </div>
        <div className="ml-4 text-sm">
          <label htmlFor="terms" className="font-semibold text-gray-200 cursor-pointer">I agree to the HackFlow Global Terms & Conditions</label>
          <p className="text-gray-500 mt-1">By proceeding further, you commit strictly to abide by the event Code of Conduct.</p>
          {errors.agreedToTerms && <p className="text-red-400 text-xs mt-2 font-medium">{errors.agreedToTerms.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-4 mt-10 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-[0.98]"
      >
        Lock Profile & Continue
      </button>
    </form>
  );
};
