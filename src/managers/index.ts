import { IDependencyManager } from "../interfaces/IDependencyManager";
import {Npm} from "./npm"
import {Pip} from "./pip"
import { Sbt } from "./sbt";
import {Gradle} from "./gradle";
import {Requirements} from "./requirements";
import {Pom} from "./pom";
import {Gem} from "./gem";

import minimatch = require("minimatch");
import { IDependencyFileMatch } from "../interfaces/IDependencyFileMatch";

// Holds all dependency managers, based on a collection of paths, can determine if
// any manager should attept to try to look up dependencies
export class ManagerFactory {

  managers : Array<IDependencyManager>

  constructor(){
      this.managers = new Array<IDependencyManager>();
      this.managers.push(new Npm());
      this.managers.push(new Pip());
      this.managers.push(new Sbt());
      this.managers.push(new Gradle());
      this.managers.push(new Requirements());
      this.managers.push(new Pom());
      this.managers.push(new Gem());
  }
  
  // this will return a list of files to process, 
  // along with the manager to process it with.
  matchFilesToManagers(paths : string[]) : Array<IDependencyFileMatch> {
      const result : IDependencyFileMatch[] = [];

      for (const manager of this.managers) {
        for (const pattern of manager.globs) {
          for(const file of minimatch.match(paths, pattern, {matchBase: true})){
            result.push({file: file, manager: manager});
          }
        }
      }

      return result;
  }


  
}