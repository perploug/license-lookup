import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { PypiBase } from "./pypi.base";
export declare class Requirements extends PypiBase implements IDependencyManager {
    name: string;
    globs: string[];
    detect(manifest: string): Promise<IDependency[]>;
}
