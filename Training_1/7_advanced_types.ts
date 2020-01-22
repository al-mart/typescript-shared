module AdvancedTypes {

    //Intersection Types
    function extend<First extends object, Second extends object>(first: First, second: Second): First & Second {
        const result: Partial<First & Second> = {};
        for (const prop in first) {
            if (first.hasOwnProperty(prop)) {
                (result as First)[prop] = first[prop];
            }
        }
        for (const prop in second) {
            if (second.hasOwnProperty(prop)) {
                (result as Second)[prop] = second[prop];
            }
        }
        return result as First & Second;
    }

    class Person {
        constructor(public name: string) {
        }
    }

    interface Loggable {
        log(name: string): void;
    }

    class ConsoleLogger implements Loggable {
        log(name: string) {
            console.log(`Hello, I'm ${name}.`);
        }
    }

    const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
    console.log(jim);

    /** Union Types*/
    module UnionTypes {
        interface Bird {
            fly(): void;

            layEggs(): void;
        }

        interface Fish {
            swim(): void;

            layEggs(): void;
        }

        function getSmallPet(): Fish | Bird {
            return {
                fly() {
                }, layEggs() {
                }, swim() {
                }
            };
        }

        let pet = getSmallPet();
        pet.layEggs(); // okay
        //pet.swim();    // errors
        //pet.fly();  // errors

        //User-Defined Type Guards
        if ((pet as Fish).swim) {
            (pet as Fish).swim();
        } else if ((pet as Bird).fly) {
            (pet as Bird).fly();
        }

        function isFish(pet: Fish | Bird): pet is Fish {  // parameterName is Type
            return (pet as Fish).swim !== undefined;
        }


        //Using the in operator

        function move(pet: Fish | Bird) {
            if ("swim" in pet) {
                return pet.swim();
            }
            return pet.fly();
        }

        //typeof type guards

        function isNumber(x: any): x is number {
            return typeof x === "number";
        }

        function isString(x: any): x is string {
            return typeof x === "string";
        }

        function padLeft(value: string, padding: string | number) {
            if (isNumber(padding)) {
                return Array(padding + 1).join(" ") + value;
            }
            if (isString(padding)) {
                return padding + value;
            }
            throw new Error(`Expected string or number, got '${padding}'.`);
        }

        interface Padder {
            getPaddingString(): string
        }

        class SpaceRepeatingPadder implements Padder {
            constructor(private numSpaces: number) { }
            getPaddingString() {
                return Array(this.numSpaces + 1).join(" ");
            }
        }

        class StringPadder implements Padder {
            constructor(private value: string) { }
            getPaddingString() {
                return this.value;
            }
        }

        function getRandomPadder() {
            return Math.random() < 0.5 ?
                new SpaceRepeatingPadder(4) :
                new StringPadder("  ");
        }

// Type is 'SpaceRepeatingPadder | StringPadder'
        let padder: Padder = getRandomPadder();

        if (padder instanceof SpaceRepeatingPadder) {
            padder; // type narrowed to 'SpaceRepeatingPadder'
        }
        if (padder instanceof StringPadder) {
            padder; // type narrowed to 'StringPadder'
        }
// NULLABLE TYPES
        function broken(name: string | null): string {
            function postfix(epithet: string) {
                return name!.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
            }
            name = name || "Bob";
            return postfix("great");
        }

        function fixed(name: string | null): string {
            function postfix(epithet: string) {
                return name!.charAt(0) + '.  the ' + epithet; // ok
            }

            name = name || "Bob";
            return postfix("great");

        }

        // Type aliasing
            type Name = string;
            type NameResolver = () => string;
            type NameOrResolver = Name | NameResolver;
            function getName(n: NameOrResolver): Name {
                if (typeof n === "string") {
                    return n;
                }
                else {
                    return n();
                }
            }

            // Diference from interfaces is that type aliasing dont create a new type its just a reference to use the union types


        type Easing = "ease-in" | "ease-out" | "ease-in-out";
        class UIElement {
            animate(dx: number, dy: number, easing: Easing) {
                if (easing === "ease-in") {
                    // ...
                }
                else if (easing === "ease-out") {
                }
                else if (easing === "ease-in-out") {
                }
                else {
                    // error! should not pass null or undefined.
                }
            }
        }

        let button = new UIElement();
        button.animate(0, 0, "ease-in");
       // button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

        function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
           //return 7;
           return 1;
        }
    }
}

module ConditionalTypes{

    //Conditional types T extends U ? X : Y
    type TypeName<T> =
        T extends string ? "string" :
            T extends number ? "number" :
                T extends boolean ? "boolean" :
                    T extends undefined ? "undefined" :
                        T extends Function ? "function" :
                            "object";

    type T0 = TypeName<string>;  // "string"
    type T1 = TypeName<"a">;  // "string"
    type T2 = TypeName<true>;  // "boolean"
    type T3 = TypeName<() => void>;  // "function"
    type T4 = TypeName<string[]>;  // "object"

    /**
     * TypeScript 2.8 adds several predefined conditional types to lib.d.ts:

     Exclude<T, U> – Exclude from T those types that are assignable to U.
     Extract<T, U> – Extract from T those types that are assignable to U.
     NonNullable<T> – Exclude null and undefined from T.
     ReturnType<T> – Obtain the return type of a function type.
     InstanceType<T> – Obtain the instance type of a constructor function type.
     Example #
     * */

    type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
    type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

    type T02 = Exclude<string | number | (() => void), Function>;  // string | number
    type T03 = Extract<string | number | (() => void), Function>;  // () => void

    type T04 = NonNullable<string | number | undefined>;  // string | number
    type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

    function f1(s: string) {
        return { a: 1, b: s };
    }

    class C {
        x = 0;
        y = 0;
    }

    type T10 = ReturnType<() => string>;  // string
    type T11 = ReturnType<(s: string) => void>;  // void
    type T12 = ReturnType<(<T>() => T)>;  // {}
    type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
    type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
    type T15 = ReturnType<any>;  // any
    type T16 = ReturnType<never>;  // never
 //   type T17 = ReturnType<string>;  // Error
    //type T18 = ReturnType<Function>;  // Error

    type T20 = InstanceType<typeof C>;  // C
    type T21 = InstanceType<any>;  // any
    type T22 = InstanceType<never>;  // never
    //type T23 = InstanceType<string>;  // Error
   // type T24 = InstanceType<Function>;  // Error
}