import {LicenseLookup}  from "../src/index";
var lib : LicenseLookup;

beforeEach(() => {
  lib = new LicenseLookup();
});

test('Manager factory returns all managers',async () => {
  expect(lib.managers.length).toBe(8);
});

test('Npm manager identifies package.json',async () => {
  var files = ["package.json", "meh.js", ".sakdjsajdks/asdljhaskjd/asdkas.json"];  
  var matches = lib.matchFilesToManager(files);
  expect( matches.length ).toBe(1);
  expect( matches[ 0 ].manager.name).toBe("Npm");
});

test('Pipy manager identifies requirements.txt',async () => {
  var files = ["requirements.txt","asdasasd.js"];  
  var matches = lib.matchFilesToManager(files);
  expect( matches.length ).toBe(1);
  expect( matches[ 0 ].manager.name).toBe("Requirements");
});

test('Library can return multiple managers',async () => {
  var files = ["requirements.txt","package.json"];  
  var matches = lib.matchFilesToManager(files);
  expect( matches.length ).toBe(2);

  //the order will always be in the order they are loaded into the manager collection
  expect(matches[ 0 ].manager.name).toBe("Npm");
  expect(matches[ 1 ].manager.name).toBe("Requirements");
});