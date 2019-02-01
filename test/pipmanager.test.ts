import { readFileSync } from "fs";
import { Pip } from "../src/managers/pip";

test('Pip Manager finds dependencies from string',async () => {
  const config = readFileSync("./test/assets/transformer-pipfile", "utf8").toString();
  
  var manager = new Pip();
  var dependencies = await manager.detect(config);

  expect(dependencies.length).toBe(2);
});

test('Pip Manager looks up dependencies from string',async () => {
  const config = readFileSync("./test/assets/transformer-pipfile", "utf8").toString();

  var manager = new Pip();
  var dependencies = await manager.detect(config);
  expect(dependencies.length).toBe(2);
  
  var lookUps = await manager.lookup(dependencies);
  expect(lookUps.length).toBe(2);

  expect(lookUps[0].found).toBe(true);
  expect(lookUps[1].license).toBe("MIT");
  
  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.found == true)).toBe(true);
});