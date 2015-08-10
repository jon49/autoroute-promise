/// <reference path="ramda.d.ts" />
var double = function (x) {
    return x + x;
};
var shout = function (x) {
    return x >= 10
        ? 'big'
        : 'small';
};
(function () {
    /* op */
    var div;
    div = R.op(function (a, b) {
        return a / b;
    });
});
(function () {
    var x;
    x = R.isArrayLike('a');
    x = R.isArrayLike([1, 2, 3]);
    x = R.isArrayLike([]);
});
(function () {
    var takesNoArg = function () { return true; };
    var takesOneArg = function (a) { return [a]; };
    var takesTwoArgs = function (a, b) { return [a, b]; };
    var takesThreeArgs = function (a, b, c) { return [a, b, c]; };
    var addFourNumbers = function (a, b, c, d) {
        return a + b + c + d;
    };
    var x1 = R.curry(addFourNumbers);
    var x2 = R.curry(addFourNumbers)(1, 2, 4);
    var x3 = R.curry(addFourNumbers)(1)(2);
    var x4 = R.curry(addFourNumbers)(1)(2)(3);
    var y1 = R.curry(addFourNumbers)(1)(2)(3)(4);
    R.nAry(0, takesNoArg);
    R.nAry(0, takesOneArg);
    R.nAry(1, takesTwoArgs);
    R.nAry(1, takesThreeArgs);
    var u1 = R.unary(takesOneArg);
    var u2 = R.unary(takesTwoArgs);
    var u3 = R.unary(takesThreeArgs);
    R.binary(takesTwoArgs);
    R.binary(takesThreeArgs);
});
/* compose */
(function () {
    var double = function (x) {
        return x + x;
    };
    var limit10 = function (x) {
        return x >= 10;
    };
    var func = R.compose(limit10, double);
    var res = R.compose(limit10, double)(10);
});
/* pipe */
(function () {
    var func = R.pipe(double, double, shout);
    var res = R.pipe(double, double, shout)(10);
});
R.invoker('charAt', String.prototype);
R.invoker('charAt', String.prototype, 1);
var square = function (x) { return x * x; };
var add = function (a, b) { return a + b; };
// Adds any number of arguments together
var addAll = function () {
    return 0;
};
// Basic example
R.useWith(addAll, double, square);
(function () {
    var printXPlusFive = function (x) { console.log(x + 5); };
    R.forEach(printXPlusFive, [1, 2, 3]);
    R.clone([{}, {}, {}]);
    R.clone([1, 2, 3]);
})();
// (() => {
//   var printXPlusFive = function(x, i) { console.log(i + 5); };
//   R.forEach.idx(printXPlusFive, [{name: 1}, {name: 2}, {name: 3}]);
// })();
var i = function (x) { return x; };
R.times(i, 5);
(function () {
    var triple = function (x) { return x * 3; };
    var square = function (x) { return x * x; };
    var squareThenDoubleThenTriple = R.pipe(square, double, triple);
    squareThenDoubleThenTriple(5); //=> 150
})();
(function () {
    var multiply = function (a, b) { return a * b; };
    var double = R.partial(multiply, 2);
    double(2); //=> 4
    var greet = function (salutation, title, firstName, lastName) {
        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
    };
    var sayHello = R.partial(greet, 'Hello');
    var sayHelloToMs = R.partial(sayHello, 'Ms.');
    sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
    var greetMsJaneJones = R.partialRight(greet, 'Ms.', 'Jane', 'Jones');
    greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
})();
(function () {
    var numberOfCalls = 0;
    var trackedAdd = function (a, b) {
        numberOfCalls += 1;
        return a + b;
    };
    var memoTrackedAdd = R.memoize(trackedAdd);
    memoTrackedAdd(1, 2); //=> 3
    numberOfCalls; //=> 1
    memoTrackedAdd(1, 2); //=> 3
    numberOfCalls; //=> 1
    memoTrackedAdd(2, 3); //=> 5
    numberOfCalls; //=> 2
    // Note that argument order matters
    memoTrackedAdd(2, 1); //=> 3
    numberOfCalls; //=> 3
})();
(function () {
    var addOneOnce = R.once(function (x) { return x + 1; });
    addOneOnce(10); //=> 11
    addOneOnce(addOneOnce(50)); //=> 11
})();
(function () {
    var slashify = R.wrap(R.flip(R.add)('/'), function (f, x) {
        return R.match(/\/$/, x) ? x : f(x);
    });
    slashify('a'); //=> 'a/'
    slashify('a/'); //=> 'a/'
})();
(function () {
    var Circle = function (r) {
        this.r = r;
        this.colors = Array.prototype.slice.call(arguments, 1);
    };
    Circle.prototype.area = function () { return Math.PI * Math.pow(this.r, 2); };
    var circleN = R.constructN(2, Circle);
    var c1 = circleN(1, 'red');
    var circle = R.construct(Circle);
    var c1 = circle(1, 'red');
})();
(function () {
    var numbers = [1, 2, 3];
    var add = function (a, b) {
        return a + b;
    };
    R.reduce(add, 10, numbers); //=> 16;
})();
(function () {
    var plus3 = R.add(3);
})();
(function () {
    var pairs = [['a', 1], ['b', 2], ['c', 3]];
    var flattenPairs = function (acc, pair) {
        return acc.concat(pair);
    };
    R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
})();
(function () {
    var values = { x: 1, y: 2, z: 3 };
    var double = function (num) {
        return num * 2;
    };
    R.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
});
(function () {
    var values = { x: 1, y: 2, z: 3 };
    var prependKeyAndDouble = function (num, key, obj) {
        return key + (num * 2);
    };
    R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
});
(function () {
    R.ap([R.multiply(2), R.add(3)], [1, 2, 3]); //=> [2, 4, 6, 4, 5, 6]
    R.of([1]); //=> [[1]]
    R.empty([1, 2, 3, 4, 5]); //=> []
});
(function () {
    R.length([1, 2, 3]); //=> 3
});
(function () {
    var isEven = function (n) {
        return n % 2 === 0;
    };
    R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
    var lastTwo = function (val, idx, list) {
        return list.length - idx <= 2;
    };
    R.filterIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
    var isOdd = function (n) {
        return n % 2 === 1;
    };
    R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
});
(function () {
    var isNotFour = function (x) {
        return !(x === 4);
    };
    R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
    R.take(2, [1, 2, 3, 4]); //=> [1, 2]
});
(function () {
    var f = function (n) { return n > 50 ? false : [-n, n + 10]; };
    R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
});
/*****************************************************************
 * Function category
 */
(function () {
    var nums = [1, 2, 3, -99, 42, 6, 7];
    R.apply(Math.max, nums); //=> 42
    R.apply(Math.max)(nums); //=> 42
});
(function () {
    var mergeThree = function (a, b, c) {
        return ([]).concat(a, b, c);
    };
    mergeThree(1, 2, 3); //=> [1, 2, 3]
    var flipped = R.flip(mergeThree);
    flipped(1, 2, 3); //=> [2, 1, 3]
});
/*********************
 * List category
 ********************/
(function () {
    var lessThan2 = R.flip(R.lt)(2);
    var lessThan3 = R.flip(R.lt)(3);
    R.all(lessThan2)([1, 2]); //=> false
    R.all(lessThan3)([1, 2]); //=> true
});
(function () {
    var lessThan0 = R.flip(R.lt)(0);
    var lessThan2 = R.flip(R.lt)(2);
    R.any(lessThan0)([1, 2]); //=> false
    R.any(lessThan2)([1, 2]); //=> true
});
(function () {
    R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
    R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    R.aperture(7, [1, 2, 3, 4, 5]); //=> []
    R.aperture(7)([1, 2, 3, 4, 5]); //=> []
});
(function () {
    R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
    R.append('tests', []); //=> ['tests']
    R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
    R.append(['tests'])(['write', 'more']); //=> ['write', 'more', ['tests']]
});
(function () {
    var duplicate = function (n) {
        return [n, n];
    };
    R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
    R.chain(duplicate)([1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
});
(function () {
    var as = [[1], [3, 4]];
    R.commute(R.of, as); //=> [[1, 3], [1, 4]]
    var bs = [[1, 2], [3]];
    R.commute(R.of, bs); //=> [[1, 3], [2, 3]]
    var cs = [[1, 2], [3, 4]];
    R.commute(R.of, cs); //=> [[1, 3], [2, 3], [1, 4], [2, 4]]
    R.commute(R.of)(cs); //=> [[1, 3], [2, 3], [1, 4], [2, 4]]
});
(function () {
    var plus10map = R.map(function (x) { return x + 10; });
    var as = [[1], [3, 4]];
    R.commuteMap(R.map(function (x) { return x + 10; }), R.of, as); //=> [[11, 13], [11, 14]]
    var bs = [[1, 2], [3]];
    R.commuteMap(plus10map, R.of, bs); //=> [[11, 13], [12, 13]]
    var cs = [[1, 2], [3, 4]];
    R.commuteMap(plus10map, R.of, cs); //=> [[11, 13], [12, 13], [11, 14], [12, 14]]
    R.commuteMap(plus10map)(R.of, cs); //=> [[11, 13], [12, 13], [11, 14], [12, 14]]
    R.commuteMap(plus10map, R.of)(cs); //=> [[11, 13], [12, 13], [11, 14], [12, 14]]
});
(function () {
    R.concat([], []); //=> []
    R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
    R.concat([4, 5, 6])([1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
    R.concat('ABC')('DEF'); // 'ABCDEF'
});
(function () {
    R.contains(3)([1, 2, 3]); //=> true
    R.contains(3, [1, 2, 3]); //=> true
    R.contains(4)([1, 2, 3]); //=> false
    R.contains({})([{}, {}]); //=> false
    var obj = {};
    R.contains(obj)([{}, obj, {}]); //=> true
});
(function () {
    var xs = [{ x: 12 }, { x: 11 }, { x: 10 }];
    R.containsWith(function (a, b) { return a.x === b.x; }, { x: 10 }, xs); //=> true
    R.containsWith(function (a, b) { return a.x === b.x; }, { x: 1 }, xs); //=> false
    R.containsWith(function (a, b) { return a.x === b.x; }, { x: 1 })(xs); //=> false
});
(function () {
    R.drop(3, [1, 2, 3, 4, 5, 6, 7]); //=> [4,5,6,7]
    R.drop(3)([1, 2, 3, 4, 5, 6, 7]); //=> [4,5,6,7]
});
(function () {
    var lteTwo = function (x) {
        return x <= 2;
    };
    R.dropWhile(lteTwo, [1, 2, 3, 4]); //=> [3, 4]
    R.dropWhile(lteTwo)([1, 2, 3, 4]); //=> [3, 4]
});
(function () {
    var isEven = function (n) {
        return n % 2 === 0;
    };
    R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
    var isEvenFn = R.filter(isEven);
    isEvenFn([1, 2, 3, 4]);
});
(function () {
    var lastTwo = function (val, idx, list) {
        return list.length - idx <= 2;
    };
    R.filterIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
    var lastTwoFn = R.filterIndexed(lastTwo);
    lastTwoFn([8, 6, 7, 5, 3, 0, 9]);
});
(function () {
    var xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
    R.find(R.propEq('a', 2))(xs); //=> {a: 2}
    R.find(R.propEq('a', 4))(xs); //=> undefined
});
(function () {
    var xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
    R.findIndex(R.propEq('a', 2))(xs); //=> 1
    R.findIndex(R.propEq('a', 4))(xs); //=> -1
    R.findIndex(function (x) { return x === 1; }, [1, 2, 3]);
});
(function () {
    var xs = [{ a: 1, b: 0 }, { a: 1, b: 1 }];
    R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
    R.findLast(R.propEq('a', 4))(xs); //=> undefined
});
(function () {
    var xs = [{ a: 1, b: 0 }, { a: 1, b: 1 }];
    R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
    R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
    R.findLastIndex(function (x) { return x === 1; }, [1, 2, 3]);
});
(function () {
    var user1 = { address: { zipCode: 90210 } };
    var user2 = { address: { zipCode: 55555 } };
    var user3 = { name: 'Bob' };
    var users = [user1, user2, user3];
    var isFamous = R.pathEq(['address', 'zipCode'], 90210);
    R.filter(isFamous, users); //=> [ user1 ]
});
(function () {
    var xs = { a: '1', b: '0' };
    R.propEq('a', '1', xs); //=> true
    R.propEq('a', '4', xs); //=> false
});
(function () {
    var xs = { a: 1, b: 0 };
    R.propEq('a', 1, xs); //=> true
    R.propEq('a', 4, xs); //=> false
});
(function () {
    var xs = { a: '1', b: '0' };
    R.propEq('a', '1', xs); //=> true
    R.propEq('a', '4', xs); //=> false
});
(function () {
    var xs = { a: 1, b: 0 };
    R.propEq('a', 1, xs); //=> true
    R.propEq('a', 4, xs); //=> false
});
;
(function () {
    var xs = { a: 1, b: 0 };
    R.propEq('a', 1, xs); //=> true
    R.propEq('a', 4, xs); //=> false
});
(function () {
    R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
    //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
});
(function () {
    var printXPlusFive = function (x) { console.log(x + 5); };
    R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
    R.forEach(printXPlusFive)([1, 2, 3]); //=> [1, 2, 3]
    //-> 6
    //-> 7
    //-> 8
});
(function () {
    var plusFive = function (num, idx, list) { list[idx] = num + 5; };
    R.forEachIndexed(plusFive)([1, 2, 3]); //=> [6, 7, 8]
});
(function () {
    R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
});
(function () {
    var byGrade = R.groupBy(function (student) {
        var score = student.score;
        return score < 65 ? 'F' :
            score < 70 ? 'D' :
                score < 80 ? 'C' :
                    score < 90 ? 'B' : 'A';
    });
    var students = [{ name: 'Abby', score: 84 },
        { name: 'Eddy', score: 58 },
        { name: 'Jack', score: 69 }];
    byGrade(students);
});
(function () {
    R.head(['fi', 'fo', 'fum']); //=> 'fi'
    R.head([10, 'ten']); // => 10
    R.head(['10', 10]); // => '10'
});
(function () {
    R.indexOf(3, [1, 2, 3, 4]); //=> 2
    R.indexOf(10)([1, 2, 3, 4]); //=> -1
});
(function () {
    R.init(['fi', 'fo', 'fum']); //=> ['fi', 'fo']
});
(function () {
    R.insert(2, 'x', [1, 2, 3, 4]); //=> [1,2,'x',3,4]
    R.insert(2)('x', [1, 2, 3, 4]); //=> [1,2,'x',3,4]
    R.insert(2, 'x')([1, 2, 3, 4]); //=> [1,2,'x',3,4]
});
(function () {
    R.insertAll(2, ['x', 'y', 'z'], [1, 2, 3, 4]); //=> [1,2,'x','y','z',3,4]
    R.insertAll(2)(['x', 'y', 'z'], [1, 2, 3, 4]); //=> [1,2,'x','y','z',3,4]
    R.insertAll(2, ['x', 'y', 'z'])([1, 2, 3, 4]); //=> [1,2,'x','y','z',3,4]
});
(function () {
    var numbers = [1, 2, 3, 4];
    var transducer = R.compose(R.map(R.add(1)), R.take(2));
    R.into([], transducer, numbers); //=> [2, 3]
    var intoArray = R.into([]);
    intoArray(transducer, numbers); //=> [2, 3]
});
(function () {
    R.isSet(['1', 1]); //=> true
    R.isSet([1, 1]); //=> false
    R.isSet([{}, {}]); //=> true
});
(function () {
    var spacer = R.join(' ');
    spacer(['a', 2, 3.4]); //=> 'a 2 3.4'
    R.join('|', [1, 2, 3]); //=> '1|2|3'
});
(function () {
    R.last(['fi', 'fo', 'fum']); //=> 'fum'
});
(function () {
    R.lastIndexOf(3, [-1, 3, 3, 0, 1, 2, 3, 4]); //=> 6
    R.lastIndexOf(10, [1, 2, 3, 4]); //=> -1
});
(function () {
    R.length([]); //=> 0
    R.length([1, 2, 3]); //=> 3
});
(function () {
    var headLens = R.lensIndex(0);
    headLens([10, 20, 30, 40]); //=> 10
    headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
    headLens.map(function (x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
});
(function () {
    var double = function (x) {
        return x * 2;
    };
    R.map(double, [1, 2, 3]); //=> [2, 4, 6]
});
(function () {
    var digits = ['1', '2', '3', '4'];
    var append = function (a, b) {
        return [a + b, a + b];
    };
    R.mapAccum(append, '0', digits); //=> ['01234', ['01', '012', '0123', '01234']]
    R.mapAccum(append)('0', digits); //=> ['01234', ['01', '012', '0123', '01234']]
    R.mapAccum(append, '0')(digits); //=> ['01234', ['01', '012', '0123', '01234']]
});
(function () {
    var digits = ['1', '2', '3', '4'];
    var append = function (a, b) {
        return [a + b, a + b];
    };
    R.mapAccumRight(append, '0', digits); //=> ['04321', ['04321', '0432', '043', '04']]
    R.mapAccumRight(append)('0', digits); //=> ['04321', ['04321', '0432', '043', '04']]
    R.mapAccumRight(append, '0')(digits); //=> ['04321', ['04321', '0432', '043', '04']]
});
(function () {
    var squareEnds = function (elt, idx, list) {
        if (idx === 0 || idx === list.length - 1) {
            return elt * elt;
        }
        return elt;
    };
    R.mapIndexed(squareEnds, [8, 5, 3, 0, 9]); //=> [64, 5, 3, 0, 81]
    R.mapIndexed(squareEnds)([8, 5, 3, 0, 9]); //=> [64, 5, 3, 0, 81]
});
(function () {
    R.mergeAll([{ foo: 1 }, { bar: 2 }, { baz: 3 }]); //=> {foo:1,bar:2,baz:3}
    R.mergeAll([{ foo: 1 }, { foo: 2 }, { bar: 2 }]); //=> {foo:2,bar:2}
});
(function () {
    R.none(R.isNaN, [1, 2, 3]); //=> true
    R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
    R.none(R.isNaN)([1, 2, 3, NaN]); //=> false
});
(function () {
    var list = ['foo', 'bar', 'baz', 'quux'];
    R.nth(1, list); //=> 'bar'
    R.nth(-1, list); //=> 'quux'
    R.nth(-99, list); //=> undefined
    R.nth(-99)(list); //=> undefined
});
(function () {
    R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
    R.partition(R.contains('s'))(['sss', 'ttt', 'foo', 'bars']);
});
(function () {
    R.pluck('a')([{ a: 1 }, { a: 2 }]); //=> [1, 2]
    R.pluck(0)([[1, 2], [3, 4]]); //=> [1, 3]
});
(function () {
    R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
    R.prepend('fee')(['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
});
(function () {
    R.range(1, 5); //=> [1, 2, 3, 4]
    R.range(50)(53); //=> [50, 51, 52]
});
(function () {
    var numbers = [1, 2, 3];
    var add = function (a, b) {
        return a + b;
    };
    R.reduce(add, 10, numbers); //=> 16
    R.reduce(add)(10, numbers); //=> 16
    R.reduce(add, 10)(numbers); //=> 16
});
(function () {
    var letters = ['a', 'b', 'c'];
    var objectify = function (accObject, elem, idx, list) {
        accObject[elem] = idx;
        return accObject;
    };
    R.reduceIndexed(objectify, {}, letters); //=> { 'a': 0, 'b': 1, 'c': 2 }
    R.reduceIndexed(objectify)({}, letters); //=> { 'a': 0, 'b': 1, 'c': 2 }
    R.reduceIndexed(objectify, {})(letters); //=> { 'a': 0, 'b': 1, 'c': 2 }
});
(function () {
    var pairs = [['a', 1], ['b', 2], ['c', 3]];
    var flattenPairs = function (acc, pair) {
        return acc.concat(pair);
    };
    R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
    R.reduceRight(flattenPairs, [])(pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
    R.reduceRight(flattenPairs)([], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
});
(function () {
    var isOdd = function (n) {
        return n % 2 === 1;
    };
    R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
    R.reject(isOdd)([1, 2, 3, 4]); //=> [2, 4]
});
(function () {
    var lastTwo = function (val, idx, list) {
        return list.length - idx <= 2;
    };
    R.rejectIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
    R.rejectIndexed(lastTwo)([8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
});
(function () {
    R.remove(2, 3, [1, 2, 3, 4, 5, 6, 7, 8]); //=> [1,2,6,7,8]
    R.remove(2, 3)([1, 2, 3, 4, 5, 6, 7, 8]); //=> [1,2,6,7,8]
    R.remove(2)(3, [1, 2, 3, 4, 5, 6, 7, 8]); //=> [1,2,6,7,8]
});
(function () {
    R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
    var obj = {};
    var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
    repeatedObjs[0] === repeatedObjs[1]; //=> true
});
(function () {
    R.reverse([1, 2, 3]); //=> [3, 2, 1]
    R.reverse([1, 2]); //=> [2, 1]
    R.reverse([1]); //=> [1]
    R.reverse([]); //=> []
});
(function () {
    var numbers = [1, 2, 3, 4];
    R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
    R.scan(R.multiply, 1)(numbers); //=> [1, 1, 2, 6, 24]
    R.scan(R.multiply)(1, numbers); //=> [1, 1, 2, 6, 24]
});
(function () {
    var xs = R.range(0, 10);
    R.slice(2, 5, xs); //=> [2, 3, 4]
    R.slice(2, 5)(xs); //=> [2, 3, 4]
    R.slice(2)(5, xs); //=> [2, 3, 4]
    var str = 'Hello World';
    R.slice(2, 5, str); //=> 'llo'
});
(function () {
    var diff = function (a, b) { return a - b; };
    R.sort(diff, [4, 2, 7, 5]); //=> [2, 4, 5, 7]
    R.sort(diff)([4, 2, 7, 5]); //=> [2, 4, 5, 7]
});
(function () {
    R.tail(['fi', 'fo', 'fum']); //=> ['fo', 'fum']
    R.tail([1, 2, 3]); //=> [2, 3]
});
(function () {
    R.take(3, [1, 2, 3, 4, 5]); //=> [1,2,3]
    var members = ["Paul Desmond", "Bob Bates", "Joe Dodge", "Ron Crotty", "Lloyd Davis", "Joe Morello", "Norman Bates",
        "Eugene Wright", "Gerry Mulligan", "Jack Six", "Alan Dawson", "Darius Brubeck", "Chris Brubeck",
        "Dan Brubeck", "Bobby Militello", "Michael Moore", "Randy Jones"];
    var takeFive = R.take(5);
    takeFive(members); //=> ["Paul Desmond","Bob Bates","Joe Dodge","Ron Crotty","Lloyd Davis"]
});
(function () {
    var isNotFour = function (x) {
        return !(x === 4);
    };
    R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
    R.takeWhile(isNotFour)([1, 2, 3, 4]); //=> [1, 2, 3]
});
(function () {
    R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
    R.times(R.identity)(5); //=> [0, 1, 2, 3, 4]
});
(function () {
    var numbers = [1, 2, 3, 4];
    var transducer = R.compose(R.map(R.add(1)), R.take(2));
    var fn = R.flip(R.append);
    R.transduce(transducer, fn, [], numbers); //=> [2, 3]
    R.transduce(transducer, fn, [])(numbers); //=> [2, 3]
    R.transduce(transducer, fn)([], numbers); //=> [2, 3]
    R.transduce(transducer)(fn, [], numbers); //=> [2, 3]
});
(function () {
    var f = function (n) { return n > 50 ? false : [-n, n + 10]; };
    R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
    R.unfold(f)(10); //=> [-10, -20, -30, -40, -50]
});
(function () {
    R.uniq([1, 1, 2, 1]); //=> [1, 2]
    R.uniq([{}, {}]); //=> [{}, {}]
    R.uniq([1, '1']); //=> [1, '1']
});
(function () {
    var strEq = function (a, b) { return String(a) === String(b); };
    R.uniqWith(strEq, [1, '1', 2, 1]); //=> [1, 2]
    R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
    R.uniqWith(strEq)([{}, {}]); //=> [{}]
    R.uniqWith(strEq)([1, '1', 1]); //=> [1]
    R.uniqWith(strEq)(['1', 1, 1]); //=> ['1']
});
(function () {
    R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
    R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
});
(function () {
    R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
    R.xprod([1, 2])(['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
});
(function () {
    R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
    R.zip([1, 2, 3])(['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
});
(function () {
    R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
    R.zipObj(['a', 'b', 'c'])([1, 2, 3]); //=> {a: 1, b: 2, c: 3}
});
(function () {
    var f = function (x, y) {
        // ...
    };
    R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']); //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
    R.zipWith(f)([1, 2, 3], ['a', 'b', 'c']); //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
    R.zipWith(f, [1, 2, 3])(['a', 'b', 'c']); //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
});
/*****************************************************************
 * Object category
 */
(function () {
    R.assoc('c', 3, { a: 1, b: 2 }); //=> {a: 1, b: 2, c: 3}
    R.assoc('c')(3, { a: 1, b: 2 }); //=> {a: 1, b: 2, c: 3}
    R.assoc('c', 3)({ a: 1, b: 2 }); //=> {a: 1, b: 2, c: 3}
    // R.assoc(R.__, 3, {a: 1, b: 2})('c'); //=> {a: 1, b: 2, c: 3}
    // R.assoc('c', R.__, {a: 1, b: 2})(3); //=> {a: 1, b: 2, c: 3}
    // R.assoc('c', 3, R.__)({a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
    // R.assoc(R.__, 3, R.__)('c', {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
});
(function () {
    R.dissoc('b', { a: 1, b: 2, c: 3 }); //=> {a: 1, c: 3}
    R.dissoc('b')({ a: 1, b: 2, c: 3 }); //=> {a: 1, c: 3}
});
(function () {
    R.assocPath(['a', 'b', 'c'], 42, { a: { b: { c: 0 } } }); //=> {a: {b: {c: 42}}}
    R.assocPath(['a', 'b', 'c'])(42, { a: { b: { c: 0 } } }); //=> {a: {b: {c: 42}}}
    R.assocPath(['a', 'b', 'c'], 42)({ a: { b: { c: 0 } } }); //=> {a: {b: {c: 42}}}
});
(function () {
    var objects = [{}, {}, {}];
    R.clone(objects);
    R.clone({});
    R.clone(10);
    R.clone('foo');
    R.clone(Date.now());
});
(function () {
    var matchPhrases = R.compose(R.createMapEntry('must'), R.map(R.createMapEntry('match_phrase')));
    matchPhrases(['foo', 'bar', 'baz']);
    R.createMapEntry(R.__, 2)('b');
});
(function () {
    R.dissoc('b', { a: 1, b: 2, c: 3 }); //=> {a: 1, c: 3}
    R.dissoc('b')({ a: 1, b: 2, c: 3 }); //=> {a: 1, c: 3}
    R.dissoc(R.__, { a: 1, b: 2, c: 3 }); //=> {a: 1, c: 3}
});
(function () {
    R.dissocPath(['a', 'b', 'c'], { a: { b: { c: 42 } } }); //=> {a: {b: {}}}
    R.dissocPath(['a', 'b', 'c'])({ a: { b: { c: 42 } } }); //=> {a: {b: {}}}
});
(function () {
    var o1 = { a: 1, b: 2, c: 3, d: 4 };
    var o2 = { a: 10, b: 20, c: 3, d: 40 };
    R.eqProps('a', o1, o2); //=> false
    R.eqProps('c', o1, o2); //=> true
    R.eqProps('c')(o1, o2); //=> true
    R.eqProps('c', o1)(o2); //=> true
});
(function () {
    R.evolve({ elapsed: R.add(1), remaining: R.add(-1) }, { name: 'Tomato', elapsed: 100, remaining: 1400 });
    //=> { name: 'Tomato', elapsed: 101, remaining: 1399 }
});
(function () {
    R.functions(R); // returns list of ramda's own function names
    var F = function () { this.x = function () { }; this.y = 1; };
    F.prototype.z = function () { };
    F.prototype.a = 100;
    R.functions(new F()); //=> ["x"]
});
(function () {
    R.functionsIn(R); // returns list of ramda's own and prototype function names
    var F = function () { this.x = function () { }; this.y = 1; };
    F.prototype.z = function () { };
    F.prototype.a = 100;
    R.functionsIn(new F()); //=> ["x", "z"]
});
(function () {
    var hasName = R.has('name');
    hasName({ name: 'alice' }); //=> true
    hasName({ name: 'bob' }); //=> true
    hasName({}); //=> false
    var point = { x: 0, y: 0 };
    var pointHas = R.has(R.__, point);
    pointHas('x'); //=> true
    pointHas('y'); //=> true
    pointHas('z'); //=> false
});
var Rectangle = (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.area = function () {
        return this.width * this.height;
    };
    return Rectangle;
})();
;
(function () {
    var square = new Rectangle(2, 2);
    R.hasIn('width', square); //=> true
    R.hasIn('area', square); //=> true
    R.hasIn(R.__, square)('area'); //=> true
});
(function () {
    var raceResultsByFirstName = {
        first: 'alice',
        second: 'jake',
        third: 'alice',
    };
    R.invert(raceResultsByFirstName);
    //=> { 'alice': ['first', 'third'], 'jake':['second'] }
});
(function () {
    var raceResults0 = {
        first: 'alice',
        second: 'jake'
    };
    R.invertObj(raceResults0);
    //=> { 'alice': 'first', 'jake':'second' }
    // Alternatively:
    var raceResults1 = ['alice', 'jake'];
    R.invertObj(raceResults1);
    //=> { 'alice': '0', 'jake':'1' }
});
(function () {
    //  toBinary :: Number -> String
    var toBinary = R.invoke('toString', [2]);
    toBinary(42); //=> '101010'
    toBinary(63); //=> '111111'
    R.invoke('toString')([2], 42);
    // R.invoke('toString')([2])(42)
});
(function () {
    R.keys({ a: 1, b: 2, c: 3 }); //=> ['a', 'b', 'c']
});
(function () {
    var F = function () { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    R.keysIn(f); //=> ['x', 'y']
});
(function () {
    var headLens = R.lens(function get(arr) { return arr[0]; }, function set(val, arr) { return [val].concat(arr.slice(1)); });
    headLens([10, 20, 30, 40]); //=> 10
    headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
    headLens.map(function (x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
    var phraseLens = R.lens(function get(obj) { return obj.phrase; }, function set(val, obj) {
        var out = R.clone(obj);
        out.phrase = val;
        return out;
    });
    var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!' };
    var obj2 = { phrase: "What's all this, then?" };
    phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
    phraseLens(obj2); // => "What's all this, then?"
    phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
    phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
});
(function () {
    R.keys({ a: 1, b: 2, c: 3 }); //=> ['a', 'b', 'c']
});
(function () {
    var F = function () { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    R.keysIn(f); //=> ['x', 'y']
});
(function () {
    var headLens = R.lens(function get(arr) { return arr[0]; }, function set(val, arr) { return [val].concat(arr.slice(1)); });
    headLens([10, 20, 30, 40]); //=> 10
    headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
    headLens.map(function (x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
    var phraseLens = R.lens(function get(obj) { return obj.phrase; }, function set(val, obj) {
        var out = R.clone(obj);
        out.phrase = val;
        return out;
    });
    var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!' };
    var obj2 = { phrase: "What's all this, then?" };
    phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
    phraseLens(obj2); // => "What's all this, then?"
    phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
    phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
});
(function () {
    var xo = { x: 1 };
    var xoLens = R.lensOn(function get(o) { return o.x; }, function set(v) { return { x: v }; }, xo);
    xoLens(); //=> 1
    xoLens.set(1000); //=> {x: 1000}
    xoLens.map(R.add(1)); //=> {x: 2}
});
(function () {
    var phraseLens = R.lensProp('phrase');
    var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!' };
    var obj2 = { phrase: "What's all this, then?" };
    phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
    phraseLens(obj2); // => "What's all this, then?"
    phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
    phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
});
(function () {
    var isPositive = function (n) {
        return n > 0;
    };
    R.pickBy(isPositive, { a: 1, b: 2, c: -1, d: 0, e: 5 }); //=> {a: 1, b: 2, e: 5}
    var containsBackground = function (val) {
        return val.bgcolor;
    };
    var colors = { 1: { color: 'read' }, 2: { color: 'black', bgcolor: 'yellow' } };
    R.pickBy(containsBackground, colors); //=> {2: {color: 'black', bgcolor: 'yellow'}}
    var isUpperCase = function (val, key) { return key.toUpperCase() === key; };
    R.pickBy(isUpperCase, { a: 1, b: 2, A: 3, B: 4 }); //=> {A: 3, B: 4}
});
(function () {
    var values = { x: 1, y: 2, z: 3 };
    var double = function (num) {
        return num * 2;
    };
    R.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
    R.mapObj(double)(values); //=> { x: 2, y: 4, z: 6 }
});
(function () {
    R.pick(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, d: 4}
    R.pick(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1}
    R.pick(['a', 'e', 'f'])({ a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1}
});
(function () {
    R.omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {b: 2, c: 3}
    R.omit(['a', 'd'])({ a: 1, b: 2, c: 3, d: 4 }); //=> {b: 2, c: 3}
});
(function () {
    R.pickAll(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, d: 4}
    R.pickAll(['a', 'd'])({ a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, d: 4}
    R.pickAll(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, e: undefined, f: undefined}
    R.pickAll(['a', 'e', 'f'])({ a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, e: undefined, f: undefined}
});
(function () {
    var isUpperCase = function (val, key) { return key.toUpperCase() === key; };
    R.pickBy(isUpperCase, { a: 1, b: 2, A: 3, B: 4 }); //=> {A: 3, B: 4}
});
(function () {
    var abby = { name: 'Abby', age: 7, hair: 'blond', grade: 2 };
    var fred = { name: 'Fred', age: 12, hair: 'brown', grade: 7 };
    var kids = [abby, fred];
    R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
});
(function () {
    R.prop('x', { x: 100 }); //=> 100
    R.prop('x', {}); //=> undefined
});
(function () {
    var alice = {
        name: 'ALICE',
        age: 101
    };
    var favorite = R.prop('favoriteLibrary');
    var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
    favorite(alice); //=> undefined
    favoriteWithDefault(alice); //=> 'Ramda'
});
(function () {
    R.props(['x', 'y'], { x: 1, y: 2 }); //=> [1, 2]
    R.props(['c', 'a', 'b'], { b: 2, a: 1 }); //=> [undefined, 1, 2]
    var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
});
(function () {
    R.toPairs({ a: 1, b: 2, c: 3 }); //=> [['a', 1], ['b', 2], ['c', 3]]
});
(function () {
    var F = function () { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
});
(function () {
    R.values({ a: 1, b: 2, c: 3 }); //=> [1, 2, 3]
});
(function () {
    var F = function () { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    R.valuesIn(f); //=> ['X', 'Y']
});
(function () {
    var spec = { x: 2 };
    R.where(spec, { w: 10, x: 2, y: 300 }); //=> true
    R.where(spec, { x: 1, y: 'moo', z: true }); //=> false
    R.where(spec)({ w: 10, x: 2, y: 300 }); //=> true
    R.where(spec)({ x: 1, y: 'moo', z: true }); //=> false
    // There's no way to represent the below functionality in typescript
    // per http://stackoverflow.com/a/29803848/632495
    // will need a work around.
    var spec2 = { x: function (val, obj) { return val + obj.y > 10; } };
    R.where(spec2, { x: 2, y: 7 }); //=> false
    R.where(spec2, { x: 3, y: 8 }); //=> true
    var xs = [{ x: 2, y: 1 }, { x: 10, y: 2 }, { x: 8, y: 3 }, { x: 10, y: 4 }];
    R.filter(R.where({ x: 10 }), xs); // ==> [{x: 10, y: 2}, {x: 10, y: 4}]
    R.filter(R.where({ x: 10 }))(xs); // ==> [{x: 10, y: 2}, {x: 10, y: 4}]
});
(function () {
    // pred :: Object -> Boolean
    var pred = R.whereEq({ a: 1, b: 2 });
    pred({ a: 1 }); //=> false
    pred({ a: 1, b: 2 }); //=> true
    pred({ a: 1, b: 2, c: 3 }); //=> true
    pred({ a: 1, b: 1 }); //=> false
    R.whereEq({ a: 'one' }, { a: 'one' }); // => true
});
/*****************************************************************
 * Function category
 */
(function () {
    var mapIndexed = R.addIndex(R.map);
    mapIndexed(function (val, idx) { return idx + '-' + val; }, ['f', 'o', 'o', 'b', 'a', 'r']);
    //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
    mapIndexed(function (rectangle, idx) { return rectangle.area() * idx; }, [new Rectangle(1, 2), new Rectangle(4, 7)]);
});
/*****************************************************************
 * Relation category
 */
(function () {
    var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
    var letters = R.split('', 'abcABCaaaBBc');
    R.countBy(Math.floor)(numbers); //=> {'1': 3, '2': 2, '3': 1}
    R.countBy(R.toLower)(letters); //=> {'a': 5, 'b': 4, 'c': 3}
});
(function () {
    R.difference([1, 2, 3, 4], [7, 6, 5, 4, 3]); //=> [1,2]
    R.difference([7, 6, 5, 4, 3], [1, 2, 3, 4]); //=> [7,6,5]
});
(function () {
    function cmp(x, y) { return x.a === y.a; }
    var l1 = [{ a: 1 }, { a: 2 }, { a: 3 }];
    var l2 = [{ a: 3 }, { a: 4 }];
    R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
});
(function () {
    R.equals(1, 1); //=> true
    R.equals('2', '1'); //=> false
    R.equals([1, 2, 3], [1, 2, 3]); //=> true
    var a = {};
    a.v = a;
    var b = {};
    b.v = b;
    R.equals(a, b); //=> true
});
(function () {
    var o = {};
    R.identical(o, o); //=> true
    R.identical(1, 1); //=> true
    R.identical('2', '1'); //=> false
    R.identical([], []); //=> false
    R.identical(0, -0); //=> false
    R.identical(NaN, NaN); //=> true
});
(function () {
    R.path(['a', 'b'], { a: { b: 2 } }); //=> 2
    R.path(['a', 'b'])({ a: { b: 2 } }); //=> 2
});
(function () {
    var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
    var alice = {
        name: 'ALICE',
        age: 101
    };
    var bob = {
        name: 'Bob',
        age: -10
    };
    var clara = {
        name: 'clara',
        age: 314.159
    };
    var people = [clara, bob, alice];
    sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
});
/*****************************************************************
 * Math category
 */
(function () {
    R.add(2, 3); //=>  5
    R.add(7)(10); //=> 17
    R.add("Hello", " World"); //=>  "Hello World"
    R.add("Hello")(" World"); //=>  "Hello World"
});
(function () {
    R.dec(42); //=> 41
});
(function () {
    R.divide(71, 100); //=> 0.71
    var half = R.divide(R.__, 2);
    half(42); //=> 21
    var reciprocal = R.divide(1);
    reciprocal(4); //=> 0.25
});
(function () {
    R.gt(2, 6); //=> false
    R.gt(2, 0); //=> true
    R.gt(2, 2); //=> false
    R.gt(R.__, 2)(10); //=> true
    R.gt(2)(10); //=> false
});
(function () {
    R.gte(2, 6); //=> false
    R.gte(2, 0); //=> true
    R.gte(2, 2); //=> false
    R.gte(R.__, 2)(10); //=> true
    R.gte(2)(10); //=> false
});
(function () {
    R.isNaN(NaN); //=> true
    R.isNaN(undefined); //=> false
    R.isNaN({}); //=> false
});
(function () {
    R.lt(2, 6); //=> true
    R.lt(2, 0); //=> false
    R.lt(2, 2); //=> false
    R.lt(5)(10); //=> true
    R.lt(R.__, 5)(10); //=> false // right-sectioned currying
});
(function () {
    R.lte(2, 6); //=> true
    R.lte(2, 0); //=> false
    R.lte(2, 2); //=> true
    R.lte(R.__, 2)(1); //=> true
    R.lte(2)(10); //=> true
});
(function () {
    R.mathMod(-17, 5); //=> 3
    R.mathMod(17, 5); //=> 2
    R.mathMod(17, -5); //=> NaN
    R.mathMod(17, 0); //=> NaN
    R.mathMod(17.2, 5); //=> NaN
    R.mathMod(17, 5.3); //=> NaN
    var clock = R.mathMod(R.__, 12);
    clock(15); //=> 3
    clock(24); //=> 0
    var seventeenMod = R.mathMod(17);
    seventeenMod(3); //=> 2
});
(function () {
    var hasName = R.has('name');
    hasName({ name: 'alice' }); //=> true
    hasName({ name: 'bob' }); //=> true
    hasName({}); //=> false
    var point = { x: 0, y: 0 };
    var pointHas = R.has(R.__, point);
    pointHas('x'); //=> true
    pointHas('y'); //=> true
    pointHas('z'); //=> false
});
(function () {
    R.max([7, 3, 9, 2, 4, 9, 3]); //=> 9
});
(function () {
    function cmp(obj) { return obj.x; }
    var a = { x: 1 }, b = { x: 2 }, c = { x: 3 };
    R.maxBy(cmp, [a, b, c]); //=> {x: 3}
    R.maxBy(cmp)([a, b, c]); //=> {x: 3}
});
(function () {
    R.min([7, 3, 9, 2, 4, 9, 3]); //=> 2
});
(function () {
    function cmp(obj) { return obj.x; }
    var a = { x: 1 }, b = { x: 2 }, c = { x: 3 };
    R.minBy(cmp, [a, b, c]); //=> {x: 1}
    R.minBy(cmp)([a, b, c]); //=> {x: 1}
});
(function () {
    R.modulo(17, 3); //=> 2
    // JS behavior:
    R.modulo(-17, 3); //=> -2
    R.modulo(17, -3); //=> 2
    var isOdd = R.modulo(R.__, 2);
    isOdd(42); //=> 0
    isOdd(21); //=> 1
});
(function () {
    var double = R.multiply(2);
    var triple = R.multiply(3);
    double(3); //=>  6
    triple(4); //=> 12
    R.multiply(2, 5); //=> 10
});
(function () {
    R.negate(42); //=> -42
});
(function () {
    R.product([2, 4, 6, 8, 100, 1]); //=> 38400
});
(function () {
    R.subtract(10, 8); //=> 2
    var minus5 = R.subtract(R.__, 5);
    minus5(17); //=> 12
    var complementaryAngle = R.subtract(90);
    complementaryAngle(30); //=> 60
    complementaryAngle(72); //=> 18
});
(function () {
    R.sum([2, 4, 6, 8, 100, 1]); //=> 121
});
/*****************************************************************
 * String category
 */
(function () {
    R.substring(0, 4, '1234567');
    R.substringFrom(4, '1234567');
    R.substringTo(8, 'abcdefghijklm');
});
(function () {
    R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
    R.replace('foo', 'bar')('foo foo foo'); //=> 'bar foo foo'
    R.replace('foo')('bar', 'foo foo foo'); //=> 'bar foo foo'
    R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
    // Use the "g" (global) flag to replace all occurrences:
    R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
    R.replace(/foo/g, 'bar')('foo foo foo'); //=> 'bar bar bar'
    R.replace(/foo/g)('bar', 'foo foo foo'); //=> 'bar bar bar'
});
(function () {
    R.nthChar(2, 'Ramda'); //=> 'm'
    R.nthChar(-2, 'Ramda'); //=> 'd'
});
(function () {
    R.nthCharCode(2, 'Ramda'); //=> 'm'.charCodeAt(0)
    R.nthCharCode(-2, 'Ramda'); //=> 'd'.charCodeAt(0)
});
/*****************************************************************
 * Is category
 */
(function () {
    R.is(Object, {}); //=> true
    R.is(Object)({}); //=> true
    R.is(Number, 1); //=> true
    R.is(Number)(1); //=> true
    R.is(Object, 1); //=> false
    R.is(Object)(1); //=> false
    R.is(String, 's'); //=> true
    R.is(String)('s'); //=> true
    R.is(String, new String('')); //=> true
    R.is(String)(new String('')); //=> true
    R.is(Object, new String('')); //=> true
    R.is(Object)(new String('')); //=> true
    R.is(Object, 's'); //=> false
    R.is(Object)('s'); //=> false
    R.is(Number, {}); //=> false
    R.is(Number)({}); //=> false
});
/*****************************************************************
 * Logic category
 */
(function () {
    var gt10 = function (x) { return x > 10; };
    var even = function (x) { return x % 2 === 0; };
    var f = R.allPass([gt10, even]);
    f(11); //=> false
    f(12); //=> true
});
(function () {
    R.and(false, true); //=> false
    R.and(0, []); //=> 0
    R.and(0)([]); //=> 0
    R.and(null, ''); //=> null
    var Why = (function (val) {
        var why;
        why.val = val;
        why.and = function (x) {
            return this.val && x;
        };
        return Why;
    })(true);
    var why = new Why(true);
    R.and(why, false); // false
});
(function () {
    var gt10 = function (x) { return x > 10; };
    var even = function (x) { return x % 2 === 0; };
    var f = R.anyPass([gt10, even]);
    f(11); //=> true
    f(8); //=> true
    f(9); //=> false
});
(function () {
    var gt10 = function (x) { return x > 10; };
    var even = function (x) { return x % 2 === 0; };
    var f = R.both(gt10, even);
    var g = R.both(gt10)(even);
    f(100); //=> true
    f(101); //=> false
});
(function () {
    var isEven = function (n) { return n % 2 === 0; };
    var isOdd = R.complement(isEven);
    isOdd(21); //=> true
    isOdd(42); //=> false
});
(function () {
    var fn = R.cond([R.eq(0), R.always('water freezes at 0°C')], [R.eq(100), R.always('water boils at 100°C')], [R.T, function (temp) { return 'nothing special happens at ' + temp + '°C'; }]);
    fn(0); //=> 'water freezes at 0°C'
    fn(50); //=> 'nothing special happens at 50°C'
    fn(100); //=> 'water boils at 100°C'
});
(function () {
    var defaultTo42 = R.defaultTo(42);
    defaultTo42(null); //=> 42
    defaultTo42(undefined); //=> 42
    defaultTo42('Ramda'); //=> 'Ramda'
});
(function () {
    var gt10 = function (x) { return x > 10; };
    var even = function (x) { return x % 2 === 0; };
    var f = R.either(gt10, even);
    var g = R.either(gt10)(even);
    f(101); //=> true
    f(8); //=> true
});
(function () {
    // Flatten all arrays in the list but leave other values alone.
    var flattenArrays = R.map(R.ifElse(Array.isArray, R.flatten, R.identity));
    flattenArrays([[0], [[10], [8]], 1234, {}]); //=> [[0], [10, 8], 1234, {}]
    flattenArrays([[[10], 123], [8, [10]], "hello"]); //=> [[10, 123], [8, 10], "hello"]
});
(function () {
    R.isEmpty([1, 2, 3]); //=> false
    R.isEmpty([]); //=> true
    R.isEmpty(''); //=> true
    R.isEmpty(null); //=> false
});
(function () {
    R.not(true); //=> false
    R.not(false); //=> true
    R.not(0); // => true
    R.not(1); // => false
});
(function () {
    R.or(false, true); //=> false
    R.or(0, []); //=> 0
    R.or(0)([]); //=> 0
    R.or(null, ''); //=> null
    var Why = (function (val) {
        var why;
        why.val = val;
        why.or = function (x) {
            return this.val && x;
        };
        return Why;
    })(true);
    var why = new Why(true);
    R.or(why, false); // false
});
