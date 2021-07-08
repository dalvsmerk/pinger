const https = require('https');

class NetworkService {
  get(host, path = '/', port = 443) {
    const options = {
      hostname: host,
      path,
      port,
    };

    return new Promise((resolve, reject) => {
      https.get(options, (res) => {
        resolve(res);
      })
      .on('abort', () => {
        reject(`${this.host} aborted connection`);
      })
      .on('timeout', () => {
        reject(`Connection with ${this.host} exceeded timeout`);
      })
      .on('error', error => {
        reject(error.message);
      });
    });
  }
}

module.exports = { NetworkService };
