import { IDependencyManager } from "../interfaces/IDependencyManager";
import { IDependency } from "../interfaces/IDependency";
import { PypiBase } from "./pypi.base";

export class Poetry extends PypiBase implements IDependencyManager{
  name = "Poetry";
  globs = ["pyproject.toml"]

  async detect(manifest : string){

    //simplify the use of [[]]
    manifest = manifest.replace("[[", "[").replace("]]", "]");

    //split the pipfile in groups and find the packages sections 
    //currently we only care about packages deployed with the codebase, not dev-deps
    var packageSection = manifest
                    .split("[")
                    .filter(x => x.indexOf("tool.poetry.dependencies]") === 0);

    if(packageSection.length === 0)
      return [];

    var packageManifest = packageSection.join("\n").replace("tool.poetry.dependencies]", ''); 
    
    var deps = packageManifest
                .split("\n")
                .filter(x => (x.length > 0 && x.indexOf("#") !== 0 && x.indexOf("-")))
                .map(x => x.split("="))
                .map(x => {
                  var idep : IDependency = {name: x[0].trim()};

                  if(x.length == 2){
                    var versionString = x[1];
                    if(versionString.indexOf("{")){
                      try{
                        // this is a longshot.. 
                        var obj = JSON.parse(versionString);
                        if(obj && obj.version){
                          idep.version = obj.version.replace("^", "");
                        }
                      }catch(ex){

                      }
                    }else{
                      idep.version = x[1].replace("\"", "").replace("'", "").replace("^", "").trim();
                    }
                    
                  }

                  return idep;
                });

    return deps;
  }
}