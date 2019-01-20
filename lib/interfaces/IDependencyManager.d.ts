import { IDependency } from "./IDependency";
import { IDependencyLookUp } from "./IDependencyLooKUp";
export interface IDependencyManager {
    name: string;
    globs: string[];
    detect(manifest: string): Promise<IDependency[]>;
    lookup(dependencies: IDependency[]): Promise<IDependencyLookUp[]>;
}
