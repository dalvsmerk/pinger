const dotenv = require('dotenv');
const { setupLogger } = require('./logging');
const { NetworkService } = require('./network/network.service');
const { PingerService } = require('./pinger/pinger.service');

dotenv.config();

const serviceToPing = process.env.PING_TARGET_HOST;
const serviceToPingPort = process.env.PING_TARGET_PORT;

if (!serviceToPing) {
  throw new Error('PING_TARGET_HOST must be present in the environment');
}

if (!serviceToPingPort) {
  throw new Error('PING_TARGET_PORT must be present in the environment');
}

watchServiceStatus(serviceToPing, serviceToPingPort);

function watchServiceStatus(url, port) {
  const loggerService = setupLogger();
  const networkService = new NetworkService();

  loggerService.debug(`Pinging ${url} service`);

  const pingerService = new PingerService(url, port, networkService, loggerService);
  pingerService.start();

  process.on('SIGTERM', stopPinging(pingerService));
  process.on('exit', stopPinging(pingerService));
}

function stopPinging(pingerService) {
  return () => pingerService.stop();
}
