import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven";


export class Sbt extends MavenBase implements IDependencyManager {
  name = "Sbt";
  globs = ["build.sbt"]

  async detect(manifest : string){

    // this is a super dodgy way of detecting dependencies
    // but  we cannot compile build.sbt, so this is how we can do it

    var match,regex = /("([\w\.-]*?)"\s*\%?\%\s+"([\w\.-]*?)"(\s*%\s+"([\w\.-]*?)")?)/g;
    var detected : IDependency[] = [];
    
    while (match = regex.exec(manifest))
    {
      if(match.length >= 3){
        var dep : IDependency = {name: `${match[2]}:${match[3]}`};
        if(match.length >= 5)
        {
          dep.version = match[5]
        }
        detected.push(dep);
      }
    }

    return detected;
  }
}