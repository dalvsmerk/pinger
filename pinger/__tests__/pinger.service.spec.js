const nock = require('nock');
const { NetworkService } = require('../../network/network.service');
const { PingerService } = require('../pinger.service');

describe('Pinger Service', () => {
  const networkService = new NetworkService();
  const loggerServiceMock = {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  };

  const HOST = 'www.example.com';

  // afterEach(() => {
  //   jest.useRealTimers();
  // });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call remote host and log successful response', async () => {
    nock(HOST).get('/').reply(200);

    const pingerService = new PingerService(HOST, networkService, loggerServiceMock);

    pingerService.start();

    jest.advanceTimersByTime(6000);
    await Promise.resolve();

    expect(loggerServiceMock.info).toHaveBeenCalled();
    expect(loggerServiceMock.info).toHaveBeenCalledWith(`${HOST} responded with 200 code`);

    pingerService.stop();
  });
});
