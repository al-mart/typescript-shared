module  BasicTypes {
    /** Boolean*/
    let isDone: boolean = false;

    /** Number */
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;

    /** Strings */
    let color: string = "blue";
    color = 'red';

    /** String Template and template expressions */
    let fullName: string = `Bob Bobbington`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

//Same as
    sentence = "Hello, my name is " + fullName + ".\n\n" +
        "I'll be " + (age + 1) + " years old next month.";

    /** Array declaration */
    let arr1: number[] = [1, 2, 3];
    let arr2: Array<number> = [1, 2, 3];

    /** Tuples
     * an array with a fixed number of elements whose types are known, but need not be the same.
     *
     */


    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ["hello", 10]; // OK
    // Initialize it incorrectly

    //x = [10, "hello"]; // Error

    //When accessing an element with a known index, the correct type is retrieved:

    console.log(x[0].substring(1)); // OK
    //console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'
    //Accessing an element outside the set of known indices fails with an error:
    //x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.
    //console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.


    /** Enums
     * More in samples/enums.ts
     */

    enum Color {RED, Green, Blue}
    let c: Color = Color.Green;


    /** Any
     * These values may come from dynamic content, e.g. from the user or a 3rd party library.
     * In these cases, we want to opt-out of type checking and let the values pass through compile-time checks.
     */

    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean

    //The any type is a powerful way to work with existing JavaScript,
    // allowing you to gradually opt-in and opt-out of type checking during compilation.
    // You might expect Object to play a similar role, as it does in other languages.
    // However, variables of type Object only allow you to assign any value to them.
    // You can’t call arbitrary methods on them, even ones that actually exist:


    //notSure.ifItExists(); // okay, ifItExists might exist at runtime
    //notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

    let prettySure: Object = 4;
    //prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

    let list: any[] = [1, true, "free"];

    list[1] = 100;

    /** Void Null Undefined
     * Void Function return and can be assigned undefined (in some case null)
     * */

    function warnUser(): void {
        console.log("This is my warning message");
    }

    let unusable: void | null = undefined;
    unusable = null; // OK if `--strictNullChecks` is not given

    // Not much else we can assign to these variables!
    let u: undefined = undefined;
    let n: null = null;

    //By default null and undefined are subtypes of all other types.
    // That means you can assign null and undefined to something like number.
    // However, when using the --strictNullChecks flag, null and undefined are only assignable to any and their respective types
    // (the one exception being that undefined is also assignable to void).
    // This helps avoid many common errors.
    // In cases where you want to pass in either a string or null or undefined, you can use the union type string | null | undefined.


    /** Never and Unknown
     * usage cases
     *
     * */

    /**Objects
     * object is a type that represents the non-primitive type,
     * i.e. anything that is not number, string, boolean, bigint, symbol, null, or undefined.
     * */

    /** Type assertions
     *
     * */
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;

    let someValue2: any = "this is a string";
    let strLength2: number = (someValue2 as string).length;
}

module TypeInference{
    class Animal{}
    class Rhino extends Animal{}
    class Elephant extends Animal{}
    class Snake extends Animal{}

    // number
    let x = 3;
    //x = "sasda";
    // Best common type number and null , so its number
    let xs= [0, 1, null];
    //xs.push("asd")
    let a  = {a:9 };
    //a = 0;

    // Here the best would be Animal[] but as we dont have any Animal in the array
    // it will be just Rhino | Elephant | Snake union type
    let zoo = [new Rhino(), new Elephant(), new Snake()];
   // zoo.push(new Animal());
    console.log("*****");
    console.log(typeof zoo);
}
module TypeCompatibility{
    interface Named {
        name: string;
    }

    class Person {
        name: string;
    }

    let p: Named;
    // OK, because of structural typing
    p = new Person();
    // -------------------------------------//
    let x: Named;
    // y's inferred type is { name: string; location: string; }
    let y = { name: "Alice", location: "Seattle" };
    x = y;

    //----------------------------------- //
    function greet(n: Named) {
        console.log("Hello, " + n.name);
    }
    greet(y); // OK

    // Comparing two functions
    let xx = (a: number) => 0;
    let yy = (b: number, s: string) => 0;

    yy = xx; // OK
    //xx = yy; // Error

    let xxx = () => ({name: "Alice"});
    let yyy = () => ({location: "Seattle", name: "Alice"});

    xxx = yyy; // OK
    //yyy = xxx; // Error, because x() lacks a location property


    // Enums are compatible with numbers, and numbers are compatible with enums.
    // Enum values from different enum types are considered incompatible.

    enum Status { Ready, Waiting }
    enum Color { Red, Blue, Green }

    let status: Status.Ready = Status.Ready;
    //status = Color.Green;  // Error
    //status = 1;
    console.log("-----------------");
    console.log(typeof Status.Waiting);
    console.log("-----------------");
    //let a : 0 = 0;

    /** Constructors and static fields doesn't matter...
     * Private and protected members in a class affect their compatibility.
     * When an instance of a class is checked for compatibility, if the target type contains a private member,
     * then the source type must also contain a private member that originated from the same class.
     * Likewise, the same applies for an instance with a protected member.
     * This allows a class to be assignment compatible with its super class,
     * */

    class Animal {
        feet: number;
        public name: string;
        constructor(name: string, public  numFeet: number) {
            this.name = name;
        }
    }

    class Size {
        feet: number;
        constructor(numFeet: number) { }
    }

    let a: Animal = new Animal("a",7);
    let ss: Size = new Size(8);

    a = ss;  // OK
    ss = a;  // OK


    let firstPerson = {name: "Aleksandr", age: 23, education: "Management Bachelor" };
    let secondPerson: Person = firstPerson;
 // Here we got an error with the literal expression
     let other: Person = {name: "Aleksandr", age: 23, education: "Management Bachelor" };

    //readonly aaaa: any = { a:  1};
}