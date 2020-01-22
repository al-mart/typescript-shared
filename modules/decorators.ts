function simpleDecorator(constructor : Function) {
    console.log('Simple decorator called.')
}

function secondDecorator(constructor : Function) {
    console.log('Second decorator called.')
}

@simpleDecorator
@secondDecorator
@decoratorFactory("test")
class ClassWithMultipleDecorators {

    constructor(){
        console.log("constructor Called")
    }

    myFunc(): void {
        console.log("myFunc Called")
    }

}

let myClassWithDec = new ClassWithMultipleDecorators();
myClassWithDec.myFunc();

function decoratorFactory(name: string) {
    return function (constructor : Function ) {
        console.log(`decorator function called with : ${name}`);
    }
}
// class decorators
function classConstructorDec(constructor: Function) {
    console.log(`constructor : ${constructor}`);
}

@classConstructorDec
class ClassWithConstructor {

}

// Property decorator
function propertyDec(target: any, propertyKey : string) {
    console.log(`target : ${target}`);
    console.log(`target.constructor : ${target.constructor}`);
    console.log(`class name : `
        + `${target.constructor.name}`);
    console.log(`propertyKey : ${propertyKey}`);
}

class ClassWithPropertyDec {
    @propertyDec
    name: string;
}
/// Method decorators

function methodDec (
    target: any,
    methodName: string,
    descriptor?: PropertyDescriptor)
{
    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`target[methodName] : ${target[methodName]}`);
}

class ClassWithMethodDec {
    @methodDec
    print(output: string) {
        console.log(`ClassWithMethodDec.print`
            + `(${output}) called.`);
    }
}


function auditLogDec(target: any,
                     methodName: string,
                     descriptor?: PropertyDescriptor) {

    let originalFunction = target[methodName];

    let auditFunction = function (this: any) {
        console.log(`auditLogDec : overide of `
            + ` ${methodName} called`);
        for (let i = 0; i < arguments.length; i++) {
            console.log(`arg : ${i} = ${arguments[i]}`);
        }
        originalFunction.apply(this, arguments);
    }

    target[methodName] = auditFunction;
    return target;
}

class ClassWithAuditDec {
    @auditLogDec
    print(arg1: string, arg2: string) {
        console.log(`ClassWithMethodDec.print`
            + `(${arg1}, ${arg2}) called.`);
    }
}

let auditClass = new ClassWithAuditDec();
auditClass.print("test1", "test2");


function parameterDec(
    target: any,
    methodName : string,
    parameterIndex: number)
{
    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`parameterIndex : ${parameterIndex}`);

}
// parameter decorators
class ClassWithParamDec {
    print(@parameterDec  value: string) {

    }
}