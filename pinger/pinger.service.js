class PingerService {
  constructor(host, networkService, loggerService) {
    if (!host || host.length === 0) {
      throw new Error('Host must not be empty');
    }

    this.host = host;
    this.networkService = networkService;
    this.loggerService = loggerService;
  }

  watchStatus() {
    setInterval(async () => {
      try {
        const { statusCode } = await this.networkService.get(this.host);
        const message = `${this.host} responded with ${statusCode} code`;

        this.loggerService.info(message);
      } catch (errorMessage) {
        this.loggerService.error(errorMessage);
      }
    }, 5000);
  }
}

module.exports = { PingerService };
