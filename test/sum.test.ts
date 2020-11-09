const sum = require('../src/sum')

describe('sum', ()=>{
    it('should sum', function () {
        expect(sum(7,3)).toBe(10);
    });
})
