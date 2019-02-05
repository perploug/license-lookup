import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven.base";

const pomparser = require("pom-parser");

export class Pom extends MavenBase implements IDependencyManager {
  name = "Pom";
  globs = ["pom.xml"]

  async detect(manifest : string){

    return new Promise<Array<IDependency>>(function(resolve, reject) {
      var opts = {xmlContent: manifest};
      pomparser.parse(opts, function(err : string, pom : any){
        var model = pom.pomObject.project.dependencies.dependency;
        
        var detected : IDependency[] = [];
        for(const dep of model){
         
            // extract name and clean it up
            var name : string = dep.artifactid.replace(/[^0-9a-z.:\-\_]/gi, '');
          
            // if the group has a group id, include this in the fully qualified name
            if(dep.groupid && dep.groupid !== '' && name.indexOf(":") < 0){
              name = dep.groupid + ":" + name;
            }
            
            detected.push({name: name, version: dep.version});
        }

        resolve(detected);
      });
      
    });
  }
}