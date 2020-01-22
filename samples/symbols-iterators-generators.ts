let sym1 =  Symbol();
let sym2 = Symbol();

//Symbols are immutable, and unique.

console.log(sym1 == sym2);

const sym3 = Symbol(8);
class MyClass {
    [sym3] : string = "Class symbolname property value!";
}
//compiler forced to declare sym3 with const
let instance = new MyClass();
console.log(`Symbol: ${instance[sym3]} ---${sym3.description}:---${sym3.toString()}`);
// Symbol iterator is like Iterable interface in java...

//for in indexes
//for of values

//implement advanced types and generics from book also
