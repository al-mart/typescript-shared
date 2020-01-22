// Interfaces can have  optional properties...
// Readonly interface can be initialized and cant be changed after that
interface Point {
    readonly x: number;
    readonly y: number;
}


interface SearchFunc {
    (source: string, subString: string): boolean;
}
 let myFunction: SearchFunc = function(a, b){
    return a.indexOf(b) > -1 ;
 };
console.log( myFunction("Butterfly","llllkkk"));

// indexable types
interface StringArray {
    [index: number]: string;
}

let myIndexable: StringArray;
myIndexable = ["Bob", "Fred"];

let myStr: string = myIndexable[0];

// Hybrid type is an interface that has properties and also methods
// inteface can extend class and inherit its private fields but after that only classes extending the parent of interface can implement it

class Parent{
    constructor(private age: number){}

    public print(){
        console.log(this.age);
    }
}
interface Inheritant extends Parent{
     inheritance: number;
     printInheritance():void;
}

class Child extends Parent implements Inheritant{
    constructor(public inheritance: number,fathersAge: number){
        super(fathersAge);
    }
    printInheritance(): void {
        console.log(this.inheritance);
    }
}
let andy = new Child(10000, 60);

// Classe
//Creates a public a member  and sets it in constructor
//Getter setters
// Static properties is accesed on class itself class can be not static at all but have static members
// Abstract classes

class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string | undefined;
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

let greeterMaker: (typeof Greeter) = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
