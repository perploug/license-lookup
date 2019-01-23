import {ManagerFactory}  from "../src/managers/index";
var factory : ManagerFactory;

beforeEach(() => {
  factory = new ManagerFactory();
});

test('Manager factory returns all managers',async () => {
  expect(factory.managers.length).toBe(4);
});

test('Npm manager identifies package.json',async () => {
  var files = ["package.json", "meh.js", ".sakdjsajdks/asdljhaskjd/asdkas.json"];  
  var matches = factory.matchFilesToManagers(files);
  expect(  matches.length ).toBe(1);
  expect(matches[ 0 ].manager.name).toBe("Npm");
});