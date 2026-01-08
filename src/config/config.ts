interface Config {
  port: number;
  nodeEnv: string;
  host: string;
}

const lifecycle = process.env.npm_lifecycle_event;

// Определяем режим по имени npm-скрипта:
// npm run dev   → development
// npm start     → production
const nodeEnv =
  lifecycle === 'dev'
    ? 'development'
    : lifecycle === 'start'
      ? 'production'
      : 'development';

const config: Config = {
  port: 8080,
  nodeEnv,
  host: nodeEnv === 'development' ? 'localhost' : 'your-host',
};

export default config;
