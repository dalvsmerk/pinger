const ServiceStatus = {
  UP: 0,   // Responds with <500 HTTP code
  DOWN: 1, // May still respond but with 500+ HTTP code
};

class PingerService {
  static MAX_RETRY = 10;

  constructor(host, networkService, loggerService) {
    if (!host || host.length === 0) {
      throw new Error('Host must not be empty');
    }

    this.host = host;
    this.networkService = networkService;
    this.loggerService = loggerService;
    this.status = ServiceStatus.UP;
    this.intervalId = null;
  }

  start() {
    let retryCounter = 0;

    this.intervalId = setInterval(async () => {
      try {
        const { statusCode } = await this.networkService.get(this.host);
        const message = `${this.host} responded with ${statusCode} code`;

        if (this.status === ServiceStatus.DOWN) {
          this.status === ServiceStatus.UP;
          this.loggerService.info(`${this.host} is up again`);
        }

        this.loggerService.info(message);
      } catch (errorMessage) {
        if (retryCounter === MAX_RETRY) {
          retryCounter = 0;
          this.status = ServiceStatus.DOWN;
          this.loggerService.error(`${this.host} is down`);
        }

        if (this.status === ServiceStatus.UP) {
          retryCounter += 1;
          this.loggerService.error(errorMessage);
        }
      }
    }, 5000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

module.exports = { PingerService };
