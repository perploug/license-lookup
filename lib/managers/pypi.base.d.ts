import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
export declare class PypiBase {
    lookup(dependencies: Array<IDependencyLookUp>): Promise<IDependencyLookUp[]>;
}
