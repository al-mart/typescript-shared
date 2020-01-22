module Interfaces {
    /**
     *  One of TypeScript’s core principles is that type checking focuses on the shape that values have.
     *  This is sometimes called “duck typing” or “structural subtyping”.
     *  In TypeScript, interfaces fill the role of naming these types,
     */

    function printLabel(labeledObj: { label: string }) {
        console.log(labeledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

    interface LabeledValue {
        label: string;
    }

    function printLabel2(labeledObj: LabeledValue) {
        console.log(labeledObj.label);
    }

    class LabeledImpl implements LabeledValue {
        constructor(public label: string) {
        }
    }

    printLabel2(myObj);
    printLabel2(new LabeledImpl("Hello"));


    /** Optional Value Interfaces*/

    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        let newSquare: { color: string, area: number } = {color: "white", area: 100};
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }

    let mySquare = createSquare({color: "black"});

    function createSquare2(config: SquareConfig): { color: string; area: number } {
        let newSquare = {color: "white", area: 100};
        /*if (config.clor) {
            // Error: Property 'clor' does not exist on type 'SquareConfig'
            newSquare.color = config.clor;
        }*/
        //if (config.otherProperty){}
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }

    class SquareImpl implements SquareConfig {
        constructor(public width: number, public color: string, public otherProperty: number) {
        }
    }
    /** very interesting gotcha with object literals*/
//    let mySquare2 = createSquare2({color: "white", width: 10, otherProperty: 9});
//    let mySquare2 = createSquare2({color: "white", width: 10, otherProperty: 9} as SquareConfig);
    let myObject = {color: "white", width: 10, otherProperty: 9};
    let mySquare25 = createSquare2(myObject);
    let mySquare3 = createSquare2(new SquareImpl(10, "yellow", 100));

    /**
     * This is called excess property checking  and if we are sure that our interface can have any extra properties,
     * It is much better to speciefy an indexable property that will have a string name and its type doesnt matter
     * as long as its name isn't color or width
     * */
    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
    }

    /** Readonly properties*/
    interface Point {
        readonly x: number;
        readonly y: number;
    }

    let p1: Point = {x: 10, y: 20};
    //p1.x = 5; // error!
    p1 = {x: 100, y: 200};  // not an error because p1 is declared with let not const also if

    const p2: any = {x: 1, y: 2};
    p2.x = 100;
    p2.a = 5;
    p2.func = () => {
        console.log(Object.keys(p2))
    };
    p2.func();


    /**
     * Function Types
     */
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = (source: string, subString: string) => {
        let result = source.search(subString);
        return result > -1;
    };
    // Name of parameters doesn't matter and we can omit type declarations
    mySearch = (src, sub) => {
        let result = src.search(sub);
        return (result > -1 ) ;
    };
    //and if we call
    //mySearch({},[]) // thats an error


    //Interfaces can extend classes  they inherit EVERYTHING even private and public or protected properties and function decalrations
    //But dont inherit function declaration implementations

    class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() { }
    }

    class TextBox extends Control {
        select() { }
    }

    //if interface extend class with private field class that implements it must extend also the class the interface has extended

// Error: Property 'state' is missing in type 'Image'.
    /*class Image implements SelectableControl {
        private state: any;
        select() { }
    }*/
}

module BasicClasses {
    class Animal {
        name: string;
        constructor(theName: string) { this.name = theName; }
        move(distanceInMeters: number = 0) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
    //First we must call super in constructor , after we can use this.
    class Snake extends Animal {
        constructor(name: string) {
            //this.move()
            super(name);
        }
        move(distanceInMeters = 5) {
            console.log("Slithering...");
            super.move(distanceInMeters);
        }
    }

    class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }

    let sam = new Snake("Sammy the Python");
    let tom: Animal = new Horse("Tommy the Palomino");

    sam.move();
    tom.move(34);
}

module TypeCompatibility{
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    animal = rhino;
    //animal = employee; // Error: 'Animal' and 'Employee' are not compatible
}

/** public protected and private are the same as in other OOP based languages
 * We can also declare a protected constructor so that it could be extended but NOT instanciated*/
/** You can make properties readonly by using the readonly keyword.
 *  Readonly properties must be initialized at their declaration or in the constructor.*/

module Further{
    // Paarameter properties make a property and initialize it by value passed in the constructor
    // there are 4 of them public,protected private and readonly .
    class Octopus {
        readonly numberOfLegs: number = 8;
        constructor(readonly name: string) {
        }
    }
    console.log(new Octopus("Hello ").name === "Hello");



    /// Accessors static property

    class Employee {
        static readonly fullNameMaxLength = 10;
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            if (newName && newName.length > Employee.fullNameMaxLength) {
                throw new Error("fullName has a max length of " + Employee.fullNameMaxLength);
            }

            this._fullName = newName;
        }
    }

    // Abstract classes

    abstract class Human {
        static readonly latinName = "Homo Sapiens";

        constructor(public name: string, public age: number, public sex: unknown, private personalLife: unknown) {}
        private cry() {}
        public drink() {}
        public abstract work(): never;
        //private abstract wait():void; //private  modifier can not be used with abstract modiefier
    }
    let child: Human; //OK
    //child = new Human(); error
}

module AdvancedTechnique{
    class Greeter {
        static standardGreeting = "Hello, there";
        greeting: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }

    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet());

    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";

    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet());
}