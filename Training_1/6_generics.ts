module Generics {

    // Some words about any
    // simple generic function
    function identity<T>(arg: T): T {
        return arg;
    }

    let s1 = identity<string>("Hello World!");
    //type interference
    let s2 = identity("Simple Hello");


    let myIdentity1: <T>(arg: T) => T = identity;
    let myIdentity2: <U>(arg: U) => U = identity;
    //We can also write the generic type as a call signature of an object literal type:
    let myIdentity3: { <U>(arg: U): U } = identity;

    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    let myIdentity4: GenericIdentityFn = identity;

    // Generic generic interface
    interface GenericIdentity<T> {
        (arg: T): T;
    }

    let myIdentity5: GenericIdentity<number> = identity;

    /**Generic classes are only generic over their instance side rather than their static side,
     *  so when working with classes, static members can not use the class’s type parameter*/

    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
        return x + y;
    };

    //Constraining


    function wrongLoggingIdentity<T>(arg: T): T {
        //console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }

    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }


    // Constraining type parameters

    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = {a: 1, b: 2, c: 3, d: 4};

    getProperty(x, "a"); // okay
    //getProperty(x, "m"); // Error,


    // Constraining with  constructors
    class BeeKeeper {
        hasMask: boolean;
    }

    class ZooKeeper {
        nametag: string;
    }

    class Animal {
        numLegs: number;
    }

    class Bee extends Animal {
        keeper: BeeKeeper;
    }

    class Lion extends Animal {
        keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    let nameTag: string = createInstance(Lion).keeper.nametag;  // typechecks!
    let hasMask: boolean = createInstance(Bee).keeper.hasMask;   // typechecks!
}