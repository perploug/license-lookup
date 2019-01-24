import { readFileSync } from "fs";
import { Pip } from "../src/managers/pip";

test('Pip Manager finds dependencies from string',async () => {
  const config = readFileSync("./test/assets/flair-requirements.txt", "utf8").toString();
  
  var manager = new Pip();
  var dependencies = await manager.detect(config);

  expect(dependencies.length).toBe(13);
});

test('Pip Manager looks up dependencies from string',async () => {
  const config = readFileSync("./test/assets/flair-requirements.txt", "utf8").toString();

  var manager = new Pip();
  var dependencies = await manager.detect(config);
  expect(dependencies.length).toBe(13);
  
  var lookUps = await manager.lookup(dependencies.slice(0, 10));
  expect(lookUps.length).toBe(10);

  expect(lookUps[0].found).toBe(true);
  expect(lookUps[1].license).toBe("LGPL-2.1");
  
  // we expect all dependencies to be found in this test
  expect(lookUps.every(x => x.found == true)).toBe(true);
});
