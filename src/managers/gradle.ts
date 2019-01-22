import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven";
const g2js = require('gradle-to-js/lib/parser');

export class Gradle extends MavenBase implements IDependencyManager {
  name = "Gradle";
  globs = ["build.gradle"]

  async detect(manifest : string){

    var model = await g2js.parseText(manifest);
    console.log(model);

    var detected : IDependency[] = [];
  
    return detected;
  }
}