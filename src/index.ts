import { ManagerFactory } from "./managers";
import { IDependencyManager } from "./interfaces/IDependencyManager";

export class DependencyLicense {
  managers : Array<IDependencyManager>;
  private manager : ManagerFactory;

  constructor(){
    this.manager = new ManagerFactory();
    this.managers = this.manager.managers;
  }

  matchFilesToManager(paths : string[]){
    return this.manager.matchFilesToManagers(paths);
  }
}