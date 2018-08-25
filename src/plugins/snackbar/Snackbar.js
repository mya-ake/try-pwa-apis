export class Snackbar {
  constructor() {
    this._mdcSnackbar = null;
    this._stackMessages = [];
  }

  set mdcSnackbar(snackbar) {
    this._mdcSnackbar = snackbar;
    this._resetStackMessage();
  }

  add(message) {
    if (this._mdcSnackbar === null) {
      this._stackMessages.push(message);
      return;
    }
    this._mdcSnackbar.show(message);
  }

  destroy() {
    this._mdcSnackbar = null;
  }

  _resetStackMessage() {
    this._stackMessages.forEach(message => {
      this._mdcSnackbar.show(message);
    });
    this._stackMessages = [];
  }
}
