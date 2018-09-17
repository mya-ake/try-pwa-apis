module.exports = class Request {
  constructor(request) {
    this._raw = request;

    this._headers = {};
    this._contentType = null;
    this._params = {};

    this._parseHeaders();
    this._parseContentType();
    this._parseQueryString();
    this._parseBody();
  }

  get headers() {
    return this._headers;
  }

  get contentType() {
    return this._contentType;
  }

  get params() {
    return this._params;
  }

  _parseHeaders() {
    this._headers = this._raw.headers;
  }

  _parseContentType() {
    const contentType = this.headers['content-type'] || null;
    if (contentType === null) {
      this._contentType = null;
    }
    this._contentType = contentType.split(';').shift();
  }

  _isAcceptableBody() {
    return this.contentType === 'application/json';
  }

  _parseBody() {
    if (this._isAcceptableBody() === false) {
      return;
    }
    const body = this._raw.body;
    this._params = {
      ...this.params,
      ...JSON.parse(body),
    };
  }

  _parseQueryString() {
    const queryStringParameters = this._raw.queryStringParameters;
    if (queryStringParameters === null) {
      return;
    }
    this._params = {
      ...this.params,
      ...queryStringParameters,
    };
  }
};
