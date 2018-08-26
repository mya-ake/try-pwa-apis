export class Storage {
  constructor({ name, db } = {}) {
    this._name = name;
    this._db = db;
  }

  save(key, value) {
    return this._db.setItem(key, value);
  }

  load(key) {
    return this._db.getItem(key);
  }

  delete(key) {
    return this._db.removeItem(key);
  }
}
