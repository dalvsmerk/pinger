const { setupLogger } = require('./logging');
const { NetworkService } = require('./network/network.service');
const { PingerService } = require('./pinger/pinger.service');

watchServiceStatus('www.google.com');

function watchServiceStatus(url) {
  const loggerService = setupLogger();
  const networkService = new NetworkService();

  loggerService.debug(`Pinging ${url} service`);

  const pingerService = new PingerService(url, networkService, loggerService);
  pingerService.watchStatus();
}
