import { readFileSync } from "fs";
import { Gem } from "../src/managers/gem";

test('Gem Manager finds dependencies from string',async () => {
  const config = readFileSync("./test/assets/rails.gemfile", "utf8").toString();
  
  var manager = new Gem();
  var dependencies = await manager.detect(config);

  expect(dependencies.length).toBe(70);
});

test('Gem Manager looks up dependencies from string',async () => {
  const config = readFileSync("./test/assets/rails.gemfile", "utf8").toString();

  var manager = new Gem();
  var dependencies = await manager.detect(config);
  expect(dependencies.length).toBe(70);
  
  var lookUps = await manager.lookup(dependencies.slice(0, 10));
  expect(lookUps.length).toBe(10);

  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.found == true)).toBe(true);
  expect(lookUps[1].license).toBe("MIT");
});