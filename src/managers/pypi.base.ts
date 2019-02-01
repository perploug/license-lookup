import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
const correct = require('spdx-correct')
import fetch from "node-fetch";

export class PypiBase {
  
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

}