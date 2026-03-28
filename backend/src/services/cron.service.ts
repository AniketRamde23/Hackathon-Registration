import cron from 'node-cron';
import Registration from '../models/Registration.model';
import User from '../models/User.model';
import { sendCancellationEmail } from './email.service';

export function startCronJobs() {
  // Run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    console.log('[CRON] Running auto-cancellation check...');
    
    try {
      const now = new Date();
      
      const expiredRegistrations = await Registration.find({
        paymentStatus: 'pending',
        expiresAt: { $lt: now },
      }).populate('userId', 'name email');

      for (const reg of expiredRegistrations) {
        // Mark as cancelled
        reg.paymentStatus = 'cancelled';
        reg.cancelledAt = now;
        await reg.save();

        // Send cancellation email
        const user = reg.userId as any;
        await sendCancellationEmail(user, reg._id.toString(), reg.expiresAt);

        console.log(`[CRON] Cancelled registration for user: ${user.email}`);
      }

      console.log(`[CRON] Auto-cancelled ${expiredRegistrations.length} registrations.`);
    } catch (error) {
      console.error('[CRON] Error in auto-cancellation:', error);
    }
  });
}
