import { readFileSync } from "fs";
import { Gradle } from "../src/managers/gradle";

test('Gradle Manager finds dependencies from string',async () => {
  const config = readFileSync("./test/assets/nakadi-build.gradle", "utf8").toString();
  
  var manager = new Gradle();
  var dependencies = await manager.detect(config);

  expect(dependencies.length).toBe(41);
  expect(dependencies.every(x => (x.name !== null && x.name.indexOf(':') > 0 ))).toBe(true);
});


test('Gradle Manager looks up dependencies from string',async () => {
  const config = readFileSync("./test/assets/nakadi-build.gradle", "utf8").toString();

  var manager = new Gradle();
  var dependencies = await manager.detect(config);
  expect(dependencies.length).toBe(41);
  
  var lookUps = await manager.lookup(dependencies.slice(0, 10));
  expect(lookUps.length).toBe(10);

  expect(lookUps[0].found).toBe(true);
  expect(lookUps[0].license).toBe("Apache-2.0");
  expect(lookUps[1].license).toBe("MIT");

  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.license !== undefined)).toBe(true);
  expect(lookUps.every(x => x.found == true)).toBe(true);

  
  
}); 
