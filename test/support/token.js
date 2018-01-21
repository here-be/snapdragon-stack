
module.exports = class Token {
  constructor(tok, match) {
    this.define('match', match);
    this.define('position', {start: 1, end: 2});
    this.type = tok.type;
    this.value = tok.value;
  }
  get range() {
    return [this.position.start, this.position.end];
  }
  define(key, value) {
    Object.defineProperty(this, key, { value: value });
    return this;
  }
};
