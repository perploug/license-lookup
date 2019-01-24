import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
import fetch from "node-fetch";
const correct = require('spdx-correct')

export class Pip implements IDependencyManager{
  name = "Pip";
  globs = ["requirements*.txt"]

  async lookup(dependencies : Array<IDependencyLookUp>){

    var baseUrl = "https://pypi.org/pypi/"
    var tasks = dependencies.map( async dep => {
      var lookUp : IDependencyLookUp = {...dep};
      
      try{
        var pipInfo = await fetch(baseUrl + lookUp.name + "/json");
        
        if(pipInfo.status === 200){
          lookUp.found = true;
          lookUp.url = "https://pypi.org/project/" + lookUp.name;

          var pipInfoJson = await pipInfo.json();

          lookUp.license = correct(pipInfoJson.info.license, { upgrade: false });
          lookUp.latestVersion = pipInfoJson.info.version;

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
    var deps = manifest
                .split("\n")
                .map(x => x.split("=="))
                .map(x => {
                  var idep : IDependency = {name: x[0]};
                  if(x.length == 2){
                    idep.version = x[1];
                  }
                  return idep;
                });

    return deps;
  }
}