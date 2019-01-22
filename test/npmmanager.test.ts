import { Npm } from "../src/managers/npm";


test('Npm Manager finds dependencies from string',async () => {
  const config = require("./assets/angular-packages.json");
  const manifestString = JSON.stringify(config);

  var manager = new Npm();
  var dependencies = await manager.detect(manifestString);

  expect(dependencies.length).toBe(56);
});

test('Npm Manager looks up dependencies from string',async () => {
  const config = require("./assets/angular-packages.json");
  const manifestString = JSON.stringify(config);

  var manager = new Npm();
  var dependencies = await manager.detect(manifestString);
  expect(dependencies.length).toBe(56);
  
  var lookUps = await manager.lookup(dependencies.slice(0, 10));
  expect(lookUps.length).toBe(10);

  expect(lookUps[0].found).toBe(true);
  expect(lookUps[0].license).toBe("MIT");
  expect(lookUps.every(x => x.license !== undefined)).toBe(true);
  
  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.found == true)).toBe(true);
});
