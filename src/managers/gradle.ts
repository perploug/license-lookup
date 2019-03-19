import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven.base";
const g2js = require("gradle-to-js/lib/parser");

export class Gradle extends MavenBase implements IDependencyManager {
  name = "Gradle";
  globs = ["build.gradle"];

  async detect(manifest: string) {
    var model = await g2js.parseText(manifest);
    var detected: IDependency[] = [];

    if(model && model.buildscript && model.buildscript.dependencies){
      for (const group of model.buildscript.dependencies) {
        if (group.type && group.type === "classpath") {
          
          if(!group.group){
            
            // if the script could not extract group and name, we need to manually parse it

            if(group.name){
             var depstring = group.name.split(":");
             var name: string = depstring[0].replace(/[^0-9a-z.:\-\_]/gi, "");
             var dep: IDependency = { name: name, version: group.version };
             
             if(depstring.length > 1){
              dep.name = dep.name + ":" + depstring[1].replace(/[^0-9a-z.:\-\_]/gi, "");
             }

             if(depstring.length > 2 && depstring[2].indexOf("$") < 0){
              dep.version = depstring[2];
             }

             detected.push(dep);
            }
          }else{
            var dep: IDependency = { name: group.group + ":" + group.name, version: group.version }; 
            detected.push(dep);
          }
          
        
        }
      }
    }

    if (model && model.dependencies) {
      for (const group of model.dependencies) {
        if (group.type && group.type === "compile") {
          
          // extract name and clean it up
          var name: string = group.name.replace(/[^0-9a-z.:\-\_]/gi, "");

          //patching bug in gr2js:
          if (name.indexOf(".") === 0) {
            name = "org" + name;
          }

          // if the group has a group id, include this in the fully qualified name
          if (group.group && group.group !== "" && name.indexOf(":") < 0) {
            name = group.group + ":" + name;
          }

          var dep: IDependency = { name: name, version: group.version };
          detected.push(dep);
        }
      }
    }

    return detected;
  }
}
