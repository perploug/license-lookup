import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven";
export declare class Sbt extends MavenBase implements IDependencyManager {
    name: string;
    globs: string[];
    detect(manifest: string): Promise<IDependency[]>;
}
