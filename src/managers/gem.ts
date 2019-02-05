import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import fetch from "node-fetch";
import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
const correct = require('spdx-correct')

export class Gem implements IDependencyManager{
  name = "Gem";
  globs = ["Gemfile"]

  async lookup(dependencies : Array<IDependencyLookUp>){

    var baseUrl = "https://rubygems.org/api/v1/gems/"
    var tasks = dependencies.map( async dep => {

      var lookUp : IDependencyLookUp = {...dep};
      try{

        var gemInfo = await fetch(baseUrl + lookUp.name + ".json");

        if(gemInfo.status === 200){
          lookUp.found = true;
         
          var gemInfoJson = await gemInfo.json();

          lookUp.license = correct(gemInfoJson.licenses[0], { upgrade: false });
          lookUp.url = "https://rubygems.org/gems/" + lookUp.name;
          lookUp.latestVersion = gemInfoJson.version;
        
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
    return manifest
                .split("\n")
                .map(x => x.trim())
                .filter(x => (x.length > 0 && x.indexOf("#") !== 0))
                .filter(x => x.indexOf("gem") === 0)
                .map(x => x.replace("gem ", ""))
                .map(x => x.split(","))
                .map(x => {

                  var idep : IDependency = {name: x[0].replace(/[^0-9a-z.:\-\_]/gi, '')};
                  return idep;

                });
  }
}