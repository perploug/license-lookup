import {ManagerFactory}  from "../src/managers/index";
var factory : ManagerFactory;

beforeEach(() => {
  factory = new ManagerFactory();
});

test('Manager factory returns all managers',async () => {
  expect(factory.managers.length).toBe(7);
});

test('Npm manager identifies package.json',async () => {
  var files = ["package.json", "meh.js", ".sakdjsajdks/asdljhaskjd/asdkas.json"];  
  var matches = factory.matchFilesToManagers(files);
  expect(  matches.length ).toBe(1);
  expect(matches[ 0 ].manager.name).toBe("Npm");
});

test('All managers find their files',async () => {
  var files = ["package.json", "Gemfile", "pom.xml", "pipfile", "build.sbt", "build.gradle","requirements.txt"];  
  var matches = factory.matchFilesToManagers(files);
  expect(  matches.length ).toBe(files.length);

  expect(matches[ 0 ].manager.name).toBe("Npm");
  expect(matches[ 2 ].manager.name).toBe("Sbt");
  expect(matches[ 6 ].manager.name).toBe("Gem");

});