import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { MavenBase } from "./maven.base";
export declare class Gradle extends MavenBase implements IDependencyManager {
    name: string;
    globs: string[];
    detect(manifest: string): Promise<IDependency[]>;
}
