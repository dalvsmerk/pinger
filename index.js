const dotenv = require('dotenv');
const { setupLogger } = require('./logging');
const { NetworkService } = require('./network/network.service');
const { PingerService } = require('./pinger/pinger.service');

dotenv.config();

const serviceToPing = process.env.PING_TARGET;

if (!serviceToPing) {
  throw new Error('PING_TARGET must be present in the environment');
}

watchServiceStatus(serviceToPing);

function watchServiceStatus(url) {
  const loggerService = setupLogger();
  const networkService = new NetworkService();

  loggerService.debug(`Pinging ${url} service`);

  const pingerService = new PingerService(url, networkService, loggerService);
  pingerService.start();

  process.on('SIGTERM', stopPinging(pingerService));
  process.on('exit', stopPinging(pingerService));
}

function stopPinging(pingerService) {
  return () => pingerService.stop();
}
