// x type is inferred to be an array of any
let x = [0, 1, null];

//Here if all elements extend Animal it doesnt take it because Animal isnt present in the array
// let zoo = [new Rhino(), new Elephant(), new Snake()];
// we must declare it explicitly
//let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

// Type compatibility
// it means that types are compatible if they have the same members
interface Person {
    name: string;
    age: number;
}

let firstPerson = {name: "Aleksandr", age: 23, education: "BD" };
let secondPerson: Person = firstPerson;

//let other: Person = {name: "Aleksandr", age: 23, education: "BD" };

// But if we want to initialize it with object we get an error
//i didnt know but we can use anonimous classes
let thirdPerson: Person = new class implements Person {
    age: number = 23;
    name: string ="AAA";
};

// assigning one function to another ones variable the target must have all sources paramenter types . names dont matter
// its true with return types