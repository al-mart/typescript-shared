// numeric enums
enum SimpleAnswer {
    Yes,
    NO,
    Maybe
}

enum Sheduler{
    YESTERDAY = -1,
    TODAY,
    TOMORROW = 1,
    NEXTMONDAY = 14,
    NEXTTUESDAY
}

//Mixed enums

enum StringAndNumber{
    YES,
    MAYBE = "Maybe",
    //  No,   if a string value is defined in an enum ,the member after must be initilized with a value
    NO = 1,

   // COMPUTED = ([1,2,3,4]).length
}

enum Computed{
    COMPUTED =([1,2,3,4]).length
}

// enums can be types of a class member

class AAA{

    constructor(public BBB: StringAndNumber.YES,public CCC: StringAndNumber){}
}

let localA = new AAA(StringAndNumber.YES, StringAndNumber.NO);
//let localB = new AAA(StringAndNumber.NO, StringAndNumber.MAYBE );

//Enums do exist at runtime

// Obtaining enums reverse mapping
console.log(SimpleAnswer[SimpleAnswer.NO]);

//const enums economic, we win in not having additional code generation for enum
const enum ConstSimpleAnswer {
    Yes,
    NO,
    Maybe
}
console.log(ConstSimpleAnswer.Maybe);
// have nothing in .js file
