const mockRequestOn = jest.fn();
const mockRequestWrite = jest.fn();
const mockRequestEnd = jest.fn();
const mockSetEncoding = jest.fn();
const mockRequestOnce = jest.fn();

const expected = {
    statusCode: 200,
    headers: {},
    response: 'NO-RESPONSE-SPECIFIED',
    error: null
};

module.exports.get = jest.fn((url, responseFunction) => {
    let onDataFunction;
    let onEndFunction;
    let onRequestErrorHandler;

    responseFunction({
        statusCode: expected.statusCode,
        headers: expected.headers,
        setEncoding: mockSetEncoding,
        on: (event, handler) => {
            if (event === 'data') {
                onDataFunction = handler;
            }
            if (event === 'end') {
                onEndFunction = handler;
            }
        }
    });

    setTimeout(() => {
        if (expected.error) {
            onRequestErrorHandler(expected.error);
            expected.error = null;
        } else {
            onDataFunction(expected.response);
            expected.response = 'NO-RESPONSE-SPECIFIED';
        }
        onEndFunction();
    }, 20);

    // request object
    return {
        on: jest.fn((event, handler) => {
            if (event === 'error') {
                onRequestErrorHandler = handler;
            }
        }),
        write: mockRequestWrite,
        end: mockRequestEnd,
        once: mockRequestOnce
    };
});

exports.___mocks = {
    mockRequestOn: mockRequestOn,
    mockRequestWrite: mockRequestWrite,
    mockRequestEnd: mockRequestEnd,
    mockSetEncoding: mockSetEncoding,
    mockRequestOnce: mockRequestOnce
};

exports.___respondWith = (status, data, headers) => {
    expected.statusCode = status;
    expected.response = data;
    expected.headers = headers;
};

exports.___respondWithError = error => {
    expected.error = error;
};
