class Logger {
  constructor() {
    this._name = null;
  }

  _log(level, ...messages) {
    const label = this._buildLabel(level);
    messages = this._buildMessage(messages);
    if (level in console) {
      console[level](label, ...messages);
    } else {
      console.log(label, ...messages);
    }
    this._clearName();
    return this;
  }

  info(...messages) {
    return this._log('info', ...messages);
  }

  warn(...messages) {
    return this._log('warn', ...messages);
  }

  error(...messages) {
    return this._log('error', ...messages);
  }

  debug(...messages) {
    return this._log('debug', ...messages);
  }

  name(name) {
    this._name = String(name);
    return this;
  }

  _clearName() {
    this._name = null;
  }

  _buildLabel(level) {
    return this._name === null ? `[${level}]` : `[${level}:${this._name}]`;
  }

  _buildMessage(messages) {
    // Cloud Watch Logs で Object の場合は整形して表示させる
    return messages.map(message => {
      return typeof message === 'object' && message !== null
        ? JSON.stringify(message)
        : message;
    });
  }
}

module.exports = new Logger();
