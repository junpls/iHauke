class Int52 {

  constructor(num) {
    this.resolve(num);
  }

  resolve(num) {
    this.numeric = num;
    this.text = this.numeric.toString(2);
    this.fields = this.text.split('');
    this.pad();
  }

  pad() {
    if (this.text.length < Int52.BITS_TOTAL) {
      this.text = '0'.repeat(Int52.BITS_TOTAL - this.text.length) + this.text;
    }
    this.fields = this.text.split('');
    return this;
  }

  setBits(lsb, num) {
    var numFields = num.toString(2).split('');
    this.fields.splice(Int52.BITS_TOTAL - lsb - numFields.length, numFields.length, ...numFields);
    this.text = this.fields.join('');
    this.numeric = parseInt(this.text, 2);
    return this.numeric;
  }

  getBits(lsb, length) {
    return parseInt(this.text.substr(Int52.BITS_TOTAL - length - lsb, length), 2);
  }
};

Int52.BITS_TOTAL = 52;

module.exports = Int52;
