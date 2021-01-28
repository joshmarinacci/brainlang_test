/**
 * @jest-environment jsdom
 */


import {add, subtract, multiply, divide, factorial, mod, power, negate, sin, cos, tan} from '../src/lang/math.js'

test('add', () => {
    // 4 + 2 >> 6
    expect(add(4,2)).toEqual(6)
    // 4 + [1,2] >> [5,6]
    expect(add(4,[1,2])).toEqual([5,6])
    //  [1,2] + 4 >> [5,6]
    expect(add([1,2],4)).toEqual([5,6])
    // [4,5]+[1,2]
    expect(add([4,5],[1,2])).toEqual([5,7])
})

test('subtract',()=>{
    // 2 - 1
    expect(subtract(2,1)).toEqual(1)
    // 1 - 2
    expect(subtract(1,2)).toEqual(-1)
    // -1 - 2
    expect(subtract(-1,2)).toEqual(-3)
    // [1,2,3] - 4 = [-3,-2,-1]
    expect(subtract([1,2,3],4)).toEqual([-3,-2,-1])
    // 4 - [1,2,3]
    expect(subtract(4,[1,2,3])).toEqual([3,2,1])
})

test('multiply', () => {
    // 4 * 5 = 20
    expect(multiply(4,5)).toEqual(20)
    // [1,2,3] * 4 = [4,8,12]
    expect(multiply([1,2,3],4)).toEqual([4,8,12])
    // 4 * [1,2,3] = [4,8,12
    expect(multiply(4,[1,2,3])).toEqual([4,8,12])
    // [1,2,3] * [4,5,6] = [4,10,18]
    expect(multiply([1,2,3],[4,5,6])).toEqual([4,10,18])
})

test('divide',() => {
    // 4/5 = 4/5
    expect(divide(4,5)).toEqual(4/5)
    // [1,2,3] / 4 = [1/4,1/2,3/4]
    expect(divide([1,2,3],4)).toEqual([1/4,1/2,3/4])
    // 4 / [1,2,3]
    expect(divide(4,[1,2,3])).toEqual([4,2,4/3])
    // [4,6,8] / [2,3,4]
    expect(divide([4,6,8],[1,2,3])).toEqual([4,3,8/3])
})

test('power',() => {
    // 2**2
    expect(power(2,2)).toEqual(2*2)
    // 2**3
    expect(power(2,3)).toEqual(2*2*2)
})

test('negate', ()=>{
    // -88
    expect(negate(88)).toEqual(-88)
    // - -88
    expect(negate(-88)).toEqual(88)
    // - [1,2,3]
    expect(negate([1,2,3])).toEqual([-1,-2,-3])
})

test('factorial',()=>{
    //!1 = 1
    expect(factorial(1)).toEqual(1)
    //!0 = 0
    expect(factorial(0)).toEqual(1)
    //!3 = 1*2*3 = 6
    expect(factorial(3)).toEqual(6)
    //![1,2,3,4,5] = [1,2,6,24,120]
    expect(factorial([1,2,3,4,5])).toEqual([1,2,6,24,120])
})

test('modulo',()=>{
    //2 mod 3 = 2
    expect(mod(2,3)).toEqual(2)
    //0 mod 3 = 0
    expect(mod(0,3)).toEqual(0)
    //4 mod 3 = 1
    expect(mod(4,3)).toEqual(1)

    //[0,1,2,3,4,5] mod 4 = [0,1,2,3,0,1]
    expect(mod([0,1,2,3,4,5],4)).toEqual([0,1,2,3,0,1])
    //4 mod [0,1,2,3,4,5] = [inf?, 0,0,3,0,1]
    expect(mod(4,[0,1,2,3,4,5])).toEqual([NaN,0,0,1,0,4])
})

//sin, cos, tan
test('trig', () => {
    //sin(0) = 0
    expect(sin(0)).toEqual(0)
    //sin(pi/2) = 1
    expect(sin(Math.PI/2)).toEqual(1)
    //sin(pi) = 0
    expect(sin(Math.PI)).toEqual(0)
    //sin([0,pi/2,pi]) = [0,1,0]
    expect(sin([0,Math.PI/2,Math.PI])).toEqual([0,1,0])
    //cos([0,pi/2,pi]) = [1,0,1]
    expect(cos([0,Math.PI/2,Math.PI])).toEqual([1,0,1])
    //tan([-pi/4,0,pi/4]) = [1,0,1]
    expect(tan([0,Math.PI/2,Math.PI])).toEqual([1,0,1])
})

//sqrt
//sqrt(4) = 2
//sqrt([1,2,4,16,25]) = [1,1.414,2,4,5]

//max and min
//max(1,2) = 2
//min(1,2) = 1
//min(-1,2) = -1
//min([1,2,3,4,5]) = 1
//max([1,99,4,3,-99]) = 99
//min([1,99,4,3,-99]) = -99
//max(1,2,3) = 3
//min(1,2,3) = 1
//min([1,2,8],[3,1,4])  what does this really mean?

//is_prime
//exp meaning e^n
//random. how to test this?


// `<` less than
// lessthan(4,5) = true
// lessthan(5,5) = false
// lessthan([1,2,6],[4,5,6]) = [true,true,false]

// `>` greater than
// greaterthan(4,5) = false
// greaterthan(5,5) = false
// greaterthan([1,2,6],[4,5,6]) = [false,false,false]

// `<=` less than or equal
// lessthanequal(4,5) = true
// lessthanequal(5,5) = true
// lessthanequal([1,2,6],[4,5,6]) = [true,true,true]

// `>=` greater than or equal
// greaterthanequal(4,5) = false
// greaterthanequal(5,5) = true
// greaterthanequal([1,2,6],[4,5,6]) = [false,false,true]


// * `=`  equal
// equal(4,5) = false
// equal(5,5) = true
// equal(4,5,6) ??
// equal([1,2,3],[1,2,3]) true
// equal([1,2,3],[1,2,4]) false or [true,true,false]

// `<>` boolean NOT equal
// notequal(4,5) = true
// notequal(5,5) = false
// notequal(4,5,6) ??
// notequal([1,2,3],[1,2,3]) false
// notequal([1,2,3],[1,2,4]) true or [false,false,true]

// `and` boolean AND
// and(true,true) = true
// and(true,false) = false
// and(false,true) = false
// and(false,false) = false
// and([true,false], [true,false]) = [true,false] or true?


// `or`  boolean OR
// or(true,true) = true
// or(true,false) = true
// or(false,true) = true
// or(false,false) = false
// or([true,false], [true,false]) = [true,false] or true?


// `not` boolean NOT
// not(true) = false
// not(false) = true
// not([true,false]) = false or [false,true]


