import { IDependencyLookUp } from "../interfaces/IDependencyLooKUp";
import { Scraper } from "../scraper";

export class MavenBase {
  
  async lookup(dependencies : Array<IDependencyLookUp>){

    var baseUrl = "https://mvnrepository.com/artifact/";
    var scraper = new Scraper();
    var tasks = dependencies.map( async dep => {
    
      var lookUp : IDependencyLookUp = {...dep};
      var group_name = dep.name.split(":");

      try{
        lookUp.license = await scraper.get(baseUrl + group_name[0] + "/" + group_name[1], "#maincontent table span.lic");
        lookUp.found = true;
      }catch(ex){
        lookUp.found = false;
      }

      return lookUp;
    })

    var lookUps = await Promise.all(tasks);
    return lookUps;
  }
}