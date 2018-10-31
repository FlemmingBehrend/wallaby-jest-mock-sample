jest.mock('http');
const http = require('http');
const httpExample = require('./http-example');

describe('http', () => {
    it('calls an endpoint', async () => {
        http.___respondWith(200, 'body', {});
        const response = await httpExample.fetchSomeApi('http://host.dk/some/api');
        expect(response).toBe('body');
    });
});
