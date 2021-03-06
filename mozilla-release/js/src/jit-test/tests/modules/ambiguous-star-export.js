// Test ambigious export * statements.

"use strict";

load(libdir + "asserts.js");
load(libdir + "dummyModuleResolveHook.js");

function checkModuleEval(source) {
    let m = parseModule(source);
    instantiateModule(m);
    evaluateModule(m);
    return m;
}

function checkModuleSyntaxError(source) {
    let m = parseModule(source);
    assertThrowsInstanceOf(() => instantiateModule(m), SyntaxError);
}

let a = moduleRepo['a'] = parseModule("export var a = 1; export var b = 2;");
let b = moduleRepo['b'] = parseModule("export var b = 3; export var c = 4;");
let c = moduleRepo['c'] = parseModule("export * from 'a'; export * from 'b';");
instantiateModule(c);
evaluateModule(c);

// Check importing/exporting non-ambiguous name works.
let d = checkModuleEval("import { a } from 'c';");
assertEq(getModuleEnvironmentValue(d, "a"), 1);
checkModuleEval("export { a } from 'c';");

// Check importing/exporting ambiguous name is a syntax error.
checkModuleSyntaxError("import { b } from 'c';");
checkModuleSyntaxError("export { b } from 'c';");

// Check that namespace objects include only non-ambiguous names.
let m = parseModule("import * as ns from 'c';");
instantiateModule(m);
evaluateModule(m);
let ns = getModuleObject(c).namespace;
let names = Object.keys(ns);
assertEq(names.length, 2);
assertEq('a' in ns, true);
assertEq('b' in ns, false);
assertEq('c' in ns, true);
