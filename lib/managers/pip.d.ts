import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
export declare class Pip implements IDependencyManager {
    name: string;
    globs: string[];
    lookup(dependencies: Array<IDependency>): Promise<IDependency[]>;
    detect(manifest: string): Promise<IDependency[]>;
}
