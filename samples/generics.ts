function genericTypeReturningFunction<T>(argument: T): T {
    return argument;
}
let funcVar: <T>(a:T) => T = genericTypeReturningFunction;

interface FunctionInterface {
    <T>(a:T): T,
}
// same as
 interface FunctionGenericInterface<U> {
     (a: U): U;
}

let firstFunc: FunctionInterface = genericTypeReturningFunction;
let secondFunc: FunctionGenericInterface<number> = genericTypeReturningFunction; // some constraint we must specify the tim in every declaration not in usage

//Generic class
class GenericClass<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
class ClassToInstantiate{

}

let numVar = new GenericClass<number>();
let classVar = new GenericClass<ClassToInstantiate>();

// Generic constraints

interface HasLength {
    length: number;
}

function getLength<T extends HasLength>(obj: T): number{
    return obj.length;
}

// chech if T has K property  keyof T creates union for all props of T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}


//Intersection Types  Fish & Bird
// Union Types Fish | Bird

interface Fish {
    swim(): never;
}

interface Bird {
    fly(): never;
}

function errorThrower(): Fish & Bird{
    let natureError: Fish & Bird = {
        swim(): never {
            throw "Swim";
        },
        fly(): never {
            throw "Fly";
        }
    };
    return natureError;
}

// Type guards

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

//Or

function move(pet: Fish | Bird) {
    if ("swim" in pet) {
        return pet.swim();
    }
    return pet.fly();
}


// Type alliases
type NumOrStr = number | string;
let nv : NumOrStr = "true";

//String Literal Types
//Numeric Literal Types
// must be one from the list
type Easing = "ease-in" | "ease-out" | "ease-in-out";
let str: Easing = "ease-in";