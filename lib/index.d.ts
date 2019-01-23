import { IDependencyManager } from "./interfaces/IDependencyManager";
export declare class DependencyLicense {
    managers: Array<IDependencyManager>;
    private manager;
    constructor();
    matchFilesToManager(paths: string[]): import("./interfaces/IDependencyFileMatch").IDependencyFileMatch[];
}
