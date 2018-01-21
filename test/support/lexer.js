
const Token = require('./token');

// mock Lexer
module.exports = class Lexer {
  constructor() {
    this.isLexer = true;
    this.tokens = [];
  }
  token(tok, match) {
    return new Token(tok, match);
  }
  push(tok) {
    const token = this.token(tok);
    this.tokens.push(token);
    return token;
  }
};
