import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Note: If using multiple .env files, dotenv should be configured carefully. 
// Standard dotenv config here for parsing locally.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Helper functions for Zod schema definitions
// Assuming 'str' and 'num' are custom helpers that wrap z.string and z.number respectively,
// potentially adding default values or other common validations.
// For this change, we'll interpret them as direct Zod types with the specified options.
const str = (options?: { default?: string; devDefault?: string }) => {
  if (options?.devDefault !== undefined) {
    return z.string().default(options.devDefault);
  }
  if (options?.default !== undefined) {
    return z.string().default(options.default);
  }
  return z.string();
};

const num = (options?: { default?: number }) => {
  if (options?.default !== undefined) {
    return z.coerce.number().default(options.default);
  }
  return z.coerce.number();
};


const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  ADMIN_URL: z.string().url().default('http://localhost:3001'),
  JUDGE_URL: z.string().url().default('http://localhost:3002'),
  MONGODB_URI:             str({ devDefault: 'mongodb://127.0.0.1:27017/hackflow-dev' }),
  
  FIREBASE_PROJECT_ID:     str(),
  FIREBASE_PRIVATE_KEY:    str(),
  FIREBASE_CLIENT_EMAIL:   str(),

  JWT_SECRET:              str({ devDefault: 'your-super-secret-jwt-key-minimum-32-chars' }),
  JWT_EXPIRES_IN:          str({ default: '7d' }),

  RAZORPAY_KEY_ID:         str(),
  RAZORPAY_KEY_SECRET:     str(),
  RAZORPAY_WEBHOOK_SECRET: str(),
  HACKATHON_FEE:           num({ default: 1 }),

  SMTP_HOST:               str({ default: 'smtp.gmail.com' }),
  SMTP_PORT:               str({ default: '587' }),
  SMTP_USER:               str({ default: 'youremail@gmail.com' }),
  SMTP_PASS:               str({ default: 'yourpassword' }),

  STRIPE_SECRET_KEY:       str({ default: '' }),
  STRIPE_WEBHOOK_SECRET:   str({ default: '' }),

  SENDGRID_API_KEY:        str({ default: '' }),
  SENDGRID_FROM_EMAIL:     str({ default: '' }),
  SENDGRID_FROM_NAME:      str({ default: 'HackFlow Team' }),
  
  CLOUDINARY_URL: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
  
  QR_BASE_URL: z.string().url(),
  
  PAYMENT_TIMEOUT_HOURS: z.string().transform(Number).default(24 as any),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:\n', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
