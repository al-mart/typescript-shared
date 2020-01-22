/**
 * Variable types... sintactic sugar, ducktyping
 */

let booleanValue: boolean = true;
//booleanValue = 1;
//but also we cant
let booleanValueDuckType = true;
//booleanValueDuckType =1;

//tuple declaration
let myTuple: [string, number, string] = ["some string", 7, "other string"];

/**
 * null and undefined are subtypes of any type but if strictnull check is unchecked in tsconfig or we must make union type
 */

// Null and undefined
//strict null check
//let someNullProperty: string = null;
let someNullOrUndefined: string | null | undefined= undefined;
// union type for string and null
let otherString: string | undefined = undefined;

// null and undefined are only assignable to their types and also to any ( undefined assignable to void)
function functionReturningVoid(): void {
    //return 0;
    return undefined;
}

// never
function error(message: string): never {
    throw new Error(message);
}
function myTest() {
    interface HasNum {
        num: number;
    }

    function infiniteLoop(x: HasNum): never {
        while (true) {
            x.num++;
        }
    }

    (function test() {
        let myObj = {num: 0};
        infiniteLoop(myObj);
        console.log(myObj.num);
    })();
}

console.log("After test");

/**
 * Type assertions
 */
function typeAssertion() {
    interface List {
        list: Array<number>;
    }

    class CustomList implements List {
        list = [1, 2, 3];
        length: number = this.list.length;
    }

    let myList: List = new CustomList();
    //console.log(myList.length);
    console.log((<CustomList>myList).length);
    console.log((myList as CustomList).length);
}


//Destructuring objects are the same as arrays and tuples... besides we can use property renaming in destructuring...
let myArray = ["one", "two", "three"];  // duck typing
let [one, two, three] = myArray;
let { a: newName1, b: newName2 = 45 } = {a: 5 };


function swap([x, y, z]: [string, string, string]) {
    [x, y, z] = [z, y, x];
}

// spread operator and rest operator
let [first, ...rest] = myArray;

// function declarations, optional properties, default values
type MyType = { a: number, b?: number };

function useMyType({a, b = 0}: MyType): string {
    return a + b + "";
}

/**
 *  lets try to guess
 * @param a
 * @param b
 */

function f({ a, b = 0 } = { a: "" }): void {
}

//f({ a: "yes" });
//f();
//f({});

// array spread
let firstArray = [1, 2];
let secondArray = [3, 4];
let bothPlus = [0, ...firstArray, ...secondArray, 5];
// object spread

let firstObject: Object = {a:"AAA", b: "BBB", c: "CCC", hello(){console.log("In first")}};
let secondObject =  {b:1, c: 2, d: {toString(){console.log("empty")}}, x: 4, hello(){console.log("In first")}};
Object.defineProperty(secondObject, "secretProperty",{value: "secret"});
// spread also works for objects but it loses methods ,,, it only spreads enumerable own properties and
// if we spread two objects who have the same name property the latest overload the one who belongs to the first object...

/**
 *  Object spread also has a couple of other surprising limits.
 *  First, it only includes an objects’ own, enumerable properties.
 *  Basically, that means you lose methods when you spread instances of an object:
 *
 */
let spreadObject = {...firstObject,...secondObject};
console.log(spreadObject);

/**
 * Buuuuuuuuuuuuuuuut
 */
class C {
    p = 12;
    m() {
    }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
//clone.m(); // error!