import { IDependencyManager } from "../interfaces/IDependencyManager";
import {Npm} from "./npm"
import {Pip} from "./pip"
import minimatch = require("minimatch");

// Holds all dependency managers, based on a collection of paths, can determine if
// any manager should attept to try to look up dependencies
export class ManagerFactory {

  managers : Array<IDependencyManager>

  constructor(){
      this.managers = new Array<IDependencyManager>();
      this.managers.push(new Npm());
      this.managers.push(new Pip());
  }
  
  // this will return a list of files to process, 
  // along with the manager to process it with.
  matchFilesToManagers(paths : string[]) : {[key: string] : IDependencyManager } {
      const result : {[key: string] : IDependencyManager } = {};

      for (const manager of this.managers) {
        for (const pattern of manager.globs) {
          for(const file of minimatch.match(paths, pattern, {matchBase: true})){
            if(file && !result[file]){
              result[file] = manager;
            }
          }
        }
      }

      return result;
  }


  
}