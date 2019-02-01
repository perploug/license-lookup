import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { PypiBase } from "./pypi.base";

export class Requirements extends PypiBase implements IDependencyManager{
  name = "Requirements";
  globs = ["requirements*.txt"]

  async detect(manifest : string){
    var deps = manifest
                .split("\n")
                .filter(x => (x.length > 0 && x.indexOf("#") !== 0 && x.indexOf("-")))
                .map(x => x.split("=="))
                .map(x => {
                  var idep : IDependency = {name: x[0].trim()};
                  if(x.length == 2){
                    idep.version = x[1].trim();
                  }
                  return idep;
                });

    return deps;
  }
}