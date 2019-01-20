import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";

export class Pip implements IDependencyManager{
  name = "Pip";
  globs = ["requirements*.txt"]

  async lookup(dependencies : Array<IDependency>){

    return dependencies;
  }

  async detect(manifest : string){
    var foundDependencies = new Array<IDependency>();

  
    //load manifest string and seperate lines
    //load dependencies and devdependencies as objects
    //lookup with npm api

    return foundDependencies;
  }
}