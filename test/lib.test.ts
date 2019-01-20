import {DependencyLicense}  from "../src/index";
var lib : DependencyLicense;

beforeEach(() => {
  lib = new DependencyLicense();
});

test('Manager factory returns all managers',async () => {
  expect(lib.managers.length).toBe(2);
});

test('Npm manager identifies package.json',async () => {
  var files = ["package.json", "meh.js", ".sakdjsajdks/asdljhaskjd/asdkas.json"];  
  var matches = lib.matchFilesToManager(files);
  expect( Object.keys( matches ).length ).toBe(1);
  expect(matches[ files[0] ].name).toBe("Npm");
});

test('Pipy manager identifies requirements.txt',async () => {
  var files = ["requirements.txt","asdasasd.js"];  
  var matches = lib.matchFilesToManager(files);
  expect( Object.keys( matches ).length ).toBe(1);
  expect(matches[ files[0] ].name).toBe("Pip");
});

test('Library can return multiple managers',async () => {
  var files = ["requirements.txt","package.json"];  
  var matches = lib.matchFilesToManager(files);
  expect( Object.keys( matches ).length ).toBe(2);
  expect(matches[ files[0] ].name).toBe("Pip");
  expect(matches[ files[1] ].name).toBe("Npm");
});