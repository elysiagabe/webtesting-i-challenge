const { repair, succeed, fail, get } = require('./enhancer.js');
// test away!
describe('enhancer.js', function() {
    const item1 = {
        name: 'Sword',
        durability: 50,
        enhancement: 10
    }

    const item2 = {
        name: 'Hammer',
        durability: 100,
        enhancement: 20
    }

    it('should run tests without errors', () => {
        expect(true).toBe(true);
    })

    // REPAIR METHOD
    describe('repair(item) method', function() {
        it('should return object w/name, durability & enhancement as properties', function(){
            expect(repair(item1)).toHaveProperty('name');
            expect(repair(item1)).toHaveProperty('durability');
            expect(repair(item1)).toHaveProperty('enhancement');
        })

        it('should return repaired item w/durability of 100', function() {
            expect(repair(item1).durability).toBe(100);
            expect(repair(item1).durability).not.toBe(50);
            expect(repair(item2).durability).toBe(100);
        })

        it('should return item with the same name as the original', function() {
            expect(repair(item1).name).toBe(item1.name);
            expect(repair(item2).name).toBe(item2.name);
        })

        it('should return item with the same enhancement number as the original', function() {
            expect(repair(item1).enhancement).toBe(item1.enhancement);
            expect(repair(item2).enhancement).toBe(item2.enhancement);
            expect(repair(item1).enhancement).not.toBe(100);
        })
    })

    // SUCCEED METHOD
    describe('succeed(item) method', function() {
        it('should return object w/name, durability & enhancement as properties', function(){
            expect(repair(item1)).toHaveProperty('name');
            expect(repair(item1)).toHaveProperty('durability');
            expect(repair(item1)).toHaveProperty('enhancement');
        })

    })

    // FAIL METHOD
    describe('fail(item) method', function() {

    })
})