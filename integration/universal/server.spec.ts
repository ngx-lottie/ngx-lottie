import * as http from 'http';

function request(url: string) {
  return new Promise<string>((resolve) => {
    http.get(url, (response) => {
      let body = '';

      response.on('data', (chunk) => (body += chunk));
      response.on('end', () => resolve(body));
    });
  });
}

afterAll((done: jest.DoneCallback) => {
  request('http://localhost:4200/stop').then(done);
});

describe('ngx-lottie server-side rendering', () => {
  it('should render page with transfer state', async () => {
    const body = await request('http://localhost:4200');

    const ngLottieTagIndex = body.indexOf('ng-lottie');
    expect(ngLottieTagIndex).toBeGreaterThan(-1);

    const childDivIndex = body.indexOf('class="moving-box"');
    expect(childDivIndex).toBeGreaterThan(-1);

    const transferStateIndex = body.indexOf('script id="universal-lottie-state"');
    expect(transferStateIndex).toBeGreaterThan(-1);
  });
});
