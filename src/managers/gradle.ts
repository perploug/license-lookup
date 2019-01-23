import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven";
const g2js = require('gradle-to-js/lib/parser');

export class Gradle extends MavenBase implements IDependencyManager {
  name = "Gradle";
  globs = ["build.gradle"]

  async detect(manifest : string){

    var model = await g2js.parseText(manifest);
    var detected : IDependency[] = [];

    for(const group of model.dependencies){
      if(group.type && group.type === 'compile'){

        // extract name and clean it up
        var name : string = group.name.replace(/[^0-9a-z.:\-\_]/gi, '');
      
        //patching bug in gr2js:
        if(name.indexOf(".") === 0){
          name = "org" + name;
        }

        // if the group has a group id, include this in the fully qualified name
        if(group.group && group.group !== '' && name.indexOf(":") < 0){
          name = group.group + ":" + name;
        }

        var dep : IDependency = {name: name, version: group.version};
        detected.push(dep);
      }
    }
    
    
  
    return detected;
  }
}