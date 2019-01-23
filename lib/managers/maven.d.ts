import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
export declare class MavenBase {
    lookup(dependencies: Array<IDependencyLookUp>): Promise<IDependencyLookUp[]>;
}
