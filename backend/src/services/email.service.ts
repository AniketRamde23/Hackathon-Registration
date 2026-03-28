import nodemailer from 'nodemailer';
import { env } from '../config/env';

// Initialize NodeMailer Transporter using generic SMTP blocks
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(env.SMTP_PORT || '587'),
  secure: env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendRegistrationConfirmationEmail = async (user: any, registrationId: string) => {
  console.log(`Bypassing Initial Registration Email for ${user.email}. Relying explicitly on Final QR Ticket Email.`);
  return true;
}

export const sendPaymentSuccessEmail = async (user: any, ticket: any, qrCodeUrl: string, team: any) => {
  
  const teamMembersHtml = team && team.memberDetails && team.memberDetails.length > 0 
    ? team.memberDetails.map((m: any, i: number) => `
        <li style="padding: 10px; background: rgba(255,255,255,0.05); margin-bottom: 5px; border-radius: 8px;">
          <strong>Member ${i+1}:</strong> ${m.name} (${m.email})
        </li>`).join('')
    : '<li style="padding: 10px;">Solo Participant</li>';

  const mailOptions = {
    from: `"HackFlow Official 🚀" <${env.SMTP_USER}>`,
    to: user.email,
    subject: '🎟️ HackFlow Registration Confirmed [Your QR Ticket Inside]',
    html: `
      <div style="font-family: Arial, sans-serif; background: #0B0F19; color: #ffffff; padding: 40px; text-align: center; border-radius: 20px;">
        <h1 style="color: #22D3EE; margin-bottom: 20px;">Registration Secured!</h1>
        <p style="font-size: 18px; color: #cccccc; margin-bottom: 30px;">
          Welcome aboard, <strong>${user.name || 'Hacker'}</strong>! Your slot in HackFlow is officially confirmed.
        </p>
        
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid #7C3AED; border-radius: 15px; padding: 30px; margin: 0 auto; max-width: 500px; text-align: left;">
          <h2 style="color: #7C3AED; margin-top: 0; text-align: center;">Team: ${team?.name || 'N/A'}</h2>
          <ul style="list-style: none; padding: 0; margin: 20px 0;">
            ${teamMembersHtml}
          </ul>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin: 30px auto 0; max-width: 500px;">
          <h2 style="color: #22D3EE; margin-top: 0;">Scan at Check-in</h2>
          <img src="${qrCodeUrl}" alt="QR Ticket" style="width: 250px; height: 250px; border-radius: 10px; margin: 20px 0; border: 4px solid #fff;" />
          <p style="font-family: monospace; font-size: 20px; color: #22D3EE; letter-spacing: 2px;">ID: ${ticket.ticketId}</p>
        </div>

        <p style="color: #888888; font-size: 14px; margin-top: 40px;">
          Please present this QR code at the physical venue registration desk. 
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ NodeMailer Success - Ticket Dispatched:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ NodeMailer Error - Failed to dispatch ticket:', error);
    return false;
  }
};

export const sendAdminOTPEmail = async (email: string, otp: string) => {
  
  // Explicitly log the OTP to the Node Terminal so the developer can bypass the Google SMTP crashes
  console.log('\n\n======================================================');
  console.log('🔴 DEVELOPMENT OTP INTERCEPT TRIGGERED');
  console.log(`📥 Target Email: ${email}`);
  console.log(`🔐 6-DIGIT OTP:  ${otp}`);
  console.log('======================================================\n\n');

  const mailOptions = {
    from: `"VYNEDAM Security Endpoint" <${env.SMTP_USER}>`,
    to: email,
    subject: `🔐 Your VYNEDAM Admin Verification Code: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #0B0F19; color: #ffffff; padding: 40px; text-align: center; border-radius: 20px;">
        <h1 style="color: #22D3EE; margin-bottom: 20px;">Admin Access Requested</h1>
        <p style="font-size: 16px; color: #cccccc; margin-bottom: 30px;">
          An attempt was made to authenticate into the Master Admin Portal using your email address.
        </p>
        
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid #7C3AED; border-radius: 12px; padding: 20px; margin: 0 auto; max-width: 400px;">
          <h2 style="color: #7C3AED; margin: 0; font-size: 32px; letter-spacing: 8px;">${otp}</h2>
        </div>
        
        <p style="color: #888888; font-size: 14px; margin-top: 40px;">
          This code will physically expire and self-destruct in exactly 5 minutes. If you did not trigger this attempt, please ignore.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ NodeMailer OTP Dispatch Failure:', error);
    return false;
  }
};
