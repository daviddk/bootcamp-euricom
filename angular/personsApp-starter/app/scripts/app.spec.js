var expect = chai.expect;

describe('test dateFormatter', function() {

    beforeEach(module('app'));

    beforeEach(inject(function(_dateFormatFilter_) {
        dateFormatFilter = _dateFormatFilter_;
    }));

   it('should return a valid date using a string', function() {
      // string
      expect(dateFormatFilter('Thu Oct 13 1988 00:00:00 GMT+0100 (CET)')).to.equal('13-10-1988');
   });

   it('should return a valid date using new Date', function() {
       // new Date
       var now = moment();
       expect(dateFormatFilter(new Date())).to.equal(now.format('DD-MM-YYYY'));
   });

   it('should return a non-valid date when undefined', function() {
       // undefined
       expect(dateFormatFilter(undefined)).to.equal(undefined);
   });

   it('should return a non-valid date when null', function() {
       // undefined
       expect(dateFormatFilter(null)).to.equal(null);
   });

   it('should return a non-valid date when number', function() {
       // number
       expect(dateFormatFilter(5)).to.equal(5);
   });

   it('should return a non-valid date when random string', function() {
       // string
       expect(dateFormatFilter('blabla')).to.equal('blabla');
   });
});
