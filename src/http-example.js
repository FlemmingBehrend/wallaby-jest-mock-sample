const http = require('http');

module.exports.fetchSomeApi = async function(url) {
    return new Promise((resolve, reject) => {
        const request = http.get(url, res => {
            let body = '';
            res.setEncoding('utf8');

            res.on('data', chunk => {
                if (chunk) body += chunk.toString();
            });

            res.on('end', () => {
                resolve(body);
                return;
            });
        });

        request.on('error', error => {
            reject(error);
        });

        request.end();
    });
};
