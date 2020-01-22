//Triple-slash references instruct the compiler to include additional files in the compilation process.
//must be first in file ... except comments if there are preceders ,are being threated as normal comment
/// <reference path="../samples/enums.ts"/>

let a = SimpleAnswer.Maybe;
/// <reference types="..." /> node it imports node s index.d.ts types ... used with handly written d.ts fles
/// <reference lib="..." /> es 2015

///<amd-module name="NamedModule"/>
//The amd-module directive allows passing an optional module name to the compiler: