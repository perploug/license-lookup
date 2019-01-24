import { IDependency } from "./IDependency";
export interface IDependencyLookUp extends IDependency {
    license?: string;
    found?: boolean;
    latestVersion?: string;
    url?: string;
}
