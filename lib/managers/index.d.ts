import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependencyFileMatch } from "../interfaces/IDependencyFileMatch";
export declare class ManagerFactory {
    managers: Array<IDependencyManager>;
    constructor();
    matchFilesToManagers(paths: string[]): Array<IDependencyFileMatch>;
}
