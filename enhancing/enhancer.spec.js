const { repair, succeed, fail, get } = require('./enhancer.js');
// test away!
describe('enhancer.js', function() {
    // TEST ITEMS
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
    const item3 = {
        name: 'Shovel',
        durability: 4,
        enhancement: 7
    }
    const item4 = {
        name: 'Rainbow',
        durability: 8,
        enhancement: 17
    }
    const item5 = {
        name: 'Duck',
        durability: 9,
        enhancement: 15
    }
    const item6 ={
        name: 'Puppy',
        durability: 29,
        enhancement: 0
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
            expect(succeed(item1)).toHaveProperty('name');
            expect(succeed(item1)).toHaveProperty('durability');
            expect(succeed(item1)).toHaveProperty('enhancement');
        })

        it('should return object with enhancement score increased by 1 if original enhancement is less than 20', function() {
            expect(succeed(item1).enhancement).toBe(11);
            expect(succeed(item1).enhancement).not.toBe(item1.enhancement);
        })

        it('should return object with enhancement score equal to 20 if original enhancement is 20', function() {
            expect(succeed(item2).enhancement).toBe(item2.enhancement);
            expect(succeed(item2).enhancement).not.toBe(21);
        })

        it('should not affect the durability number', function() {
            expect(succeed(item1).durability).toBe(item1.durability);
            expect(succeed(item2).durability).toBe(item2.durability);
        })

        it('should not affect the name', function() {
            expect(succeed(item1).name).toBe(item1.name);
            expect(succeed(item2).name).toBe(item2.name);
        })

    })

    // FAIL METHOD
    describe('fail(item) method', function() {
        it('should return object w/name, durability & enhancement as properties', function() {
            expect(fail(item1)).toHaveProperty('name');
            expect(fail(item1)).toHaveProperty('durability');
            expect(fail(item1)).toHaveProperty('enhancement');
        })

        it('should not affect the name', function() {
            expect(fail(item1).name).toBe(item1.name);
            expect(fail(item2).name).toBe(item2.name);
        })

        it('if enhancement < 15, durability should decrease by 5', function() {
            expect(fail(item1).durability).toBe(45);
            expect(fail(item2).durability).not.toBe(95);
        })

        it('if enhancement >= 15, durability should decrease by 10', function() {
            expect(fail(item1).durability).not.toBe(40);
            expect(fail(item2).durability).toBe(90);
        })

        it('if enhancement is <= 16, enhancement should stay the same', function() {
            expect(fail(item1).enhancement).toBe(item1.enhancement);
            expect(fail(item2).enhancement).not.toBe(item2.enhancement);
        })

        it('if enhancement is > 16, enhancement should decrease by 1', function() {
            expect(fail(item1).enhancement).not.toBe(item1.enhancement-1);
            expect(fail(item2).enhancement).toBe(19);
            expect(fail(item4).enhancement).toBe(16);
        })

        it('if enhancement level is 0, nothing should happen', function() {
            expect(fail(item4)).not.toEqual(item4);
            expect(fail(item6)).toEqual(item6)
        })

        it('should never return durability less than 0', function() {
            expect(fail(item3).durability).not.toBe(-1);
            expect(fail(item3).durability).toBe(0);
            expect(fail(item4).durability).not.toBe(-2);
            expect(fail(item4).durability).toBe(0);
            expect(fail(item5).durability).toBe(0);
        })

    })

    // [STRETH] GET METHOD
    describe('get(item) method', function() {
        it('if enhancement level > 0, should return name with enhancement level preceding name', function() {
            expect(get(item4).name).not.toBe(item4.name);
            expect(get(item4).name).toBe(`[+${item4.enhancement}] ${item4.name}`);
            expect(get(item6).name).not.toBe(`[+${item6.enhancement}] ${item6.name}`);
        })

        it('if enhancement level = 0, no change should be made to name', function() {
            expect(get(item6).name).toBe(item6.name);
        })

        it('should not affect enhancement level', function() {
            expect(get(item4).enhancement).toBe(item4.enhancement);
            expect(get(item6).enhancement).toBe(item6.enhancement);
        })

        it('should not affect durability', function() {
            expect(get(item4).durability).toBe(item4.durability);
            expect(get(item6).durability).toBe(item6.durability);
        })
    })
})