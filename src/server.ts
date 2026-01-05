import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';
import config from './config/config';

let server: http.Server | https.Server;

if (config.https.enabled) {
  // Production mode with HTTPS
  if (!config.https.certPath || !config.https.keyPath) {
    console.error('SSL certificate paths are required in production mode');
    console.error(
      'Please set SSL_CERT_PATH and SSL_KEY_PATH environment variables',
    );
    process.exit(1);
  }

  try {
    const options = {
      cert: fs.readFileSync(config.https.certPath),
      key: fs.readFileSync(config.https.keyPath),
    };

    server = https.createServer(options, app);
    console.log(`HTTPS Server running on port ${config.port}`);
  } catch (error) {
    console.error('Failed to load SSL certificates:', error);
    process.exit(1);
  }
} else {
  // Development mode with HTTP
  server = http.createServer(app);
  console.log(`HTTP Server running on port ${config.port}`);
}

server.listen(config.port, () => {
  const protocol = config.https.enabled ? 'https' : 'http';
  console.log(
    `Server running in ${config.nodeEnv} mode on ${protocol}://host:${config.port}`,
  );
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const port = config.port;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
