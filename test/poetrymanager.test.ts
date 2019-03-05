import { readFileSync } from "fs";
import { Poetry } from "../src/managers/poetry";

test('Poetry Manager finds dependencies from string',async () => {
  const config = readFileSync("./test/assets/transformer.poetryfile", "utf8").toString();
  
  var manager = new Poetry();
  var dependencies = await manager.detect(config);

  expect(dependencies.length).toBe(9);
});

test('Poetry Manager looks up dependencies from string',async () => {
  const config = readFileSync("./test/assets/transformer.poetryfile", "utf8").toString();

  var manager = new Poetry();
  var dependencies = await manager.detect(config);
  expect(dependencies.length).toBe(9);
  
  var lookUps = await manager.lookup(dependencies);
  expect(lookUps.length).toBe(9);

  expect(lookUps[0].found).toBe(true);
  expect(lookUps[1].license).toBe("MIT");
  
  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.found == true)).toBe(true);
});