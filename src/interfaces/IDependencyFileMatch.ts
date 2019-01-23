import { IDependencyManager } from "./IDependencyManager";

export interface IDependencyFileMatch {
  file: string;
  manager : IDependencyManager;
}