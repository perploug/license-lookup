import { IDependencyManager } from "../interfaces/IDependencyManager";
export declare class ManagerFactory {
    managers: Array<IDependencyManager>;
    constructor();
    matchFilesToManagers(paths: string[]): {
        [key: string]: IDependencyManager;
    };
}
