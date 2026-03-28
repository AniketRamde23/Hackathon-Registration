import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        printf(({ level, message, timestamp, stack }) => {
          if (stack) return `[${timestamp}] ${level}: ${message}\n${stack}`;
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    })
  ],
});
