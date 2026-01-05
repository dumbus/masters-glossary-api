import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  https: {
    enabled: boolean;
    certPath?: string;
    keyPath?: string;
  };
}

const isProduction = process.env.NODE_ENV === 'production';

const config: Config = {
  port: isProduction
    ? Number(process.env.PORT) || 443
    : Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  https: {
    enabled: isProduction,
    certPath: process.env.SSL_CERT_PATH,
    keyPath: process.env.SSL_KEY_PATH,
  },
};

export default config;
