const volPath = require('../assets/scripts/main');

describe('test formatVolumeIconpath', () => {
    test('largest volume', () => {
        expect(volPath(67)).toContain('3');
    });
    test('second-tier volume', () => {
        expect(volPath(50)).toContain('2');
    });
    test('third-tier volume', () => {
        expect(volPath(10)).toContain('1');
    });
    test('small volume', () => {
        expect(volPath(-1)).toContain('0');
    });
});