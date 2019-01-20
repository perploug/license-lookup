import { IDependency } from "./IDependency";

export interface IDependencyManager {
  name: string; //Identity
  globs: string[]; //Globs to detect package manager files to search
  
  detect(manifest : string) : Promise<IDependency[]>; //return a list of found dependencies
  lookup(dependencies : IDependency[]) : Promise<IDependencyLookUp[]>; //looks up license for a list of dependencies
}