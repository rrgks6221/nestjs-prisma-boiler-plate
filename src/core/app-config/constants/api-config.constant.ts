const DATABASE = {
  DATABASE_URL: 'DATABASE_URL',
} as const;

// JWT
const JWT = {
  JWT_ACCESS_KEY: 'JWT_ACCESS_KEY',
} as const;

const NOTIFICATION = {
  NOTIFICATION_SERVER_EXCEPTION: 'NOTIFICATION_SERVER_EXCEPTION',
} as const;

export const ENV_KEY = {
  PORT: 'PORT',
  NODE_ENV: 'NODE_ENV',
  ...JWT,
  ...DATABASE,
  ...NOTIFICATION,
} as const;
