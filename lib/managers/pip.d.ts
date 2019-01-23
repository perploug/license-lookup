import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
export declare class Pip implements IDependencyManager {
    name: string;
    globs: string[];
    lookup(dependencies: Array<IDependencyLookUp>): Promise<IDependencyLookUp[]>;
    detect(manifest: string): Promise<IDependency[]>;
}
