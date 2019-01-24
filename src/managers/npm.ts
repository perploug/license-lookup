import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import fetch from "node-fetch";
import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
const correct = require('spdx-correct')

export class Npm implements IDependencyManager{
  name = "Npm";
  globs = ["package.json"]

  async lookup(dependencies : Array<IDependencyLookUp>){

    var baseUrl = "https://registry.npmjs.org/"
    var tasks = dependencies.map( async dep => {

      var lookUp : IDependencyLookUp = {...dep};
      try{
        var npmInfo = await fetch(baseUrl + lookUp.name);
        if(npmInfo.status === 200){
          lookUp.found = true;
         
          var npminfoJson = await npmInfo.json();

          
          lookUp.license = correct(npminfoJson.license);
          lookUp.url = "https://www.npmjs.com/package/" + lookUp.name;
          if(npminfoJson.versions){
            lookUp.latestVersion = npminfoJson.versions[npminfoJson.versions.length-1];
          }

        }else{
          lookUp.found = false;
        }
        
      }catch(ex){

      }
      return lookUp;
    })

    var lookUps = await Promise.all(tasks);
    return lookUps;
  }

  async detect(manifest : string){
    var foundDependencies = new Array<IDependency>();
    
    //convert manifest string to json
    var packageJson = JSON.parse(manifest);
    if(packageJson.dependencies){
      for(const dependencyName of Object.keys(packageJson.dependencies)){
        var dependency : IDependency = {name: dependencyName, version: packageJson[dependencyName]};
        foundDependencies.push(dependency); 
      }
    }
    return foundDependencies;
  }
}