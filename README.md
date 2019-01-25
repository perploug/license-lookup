# License Lookup
Lightweight package dependency License detector designed to run without access to the entire filesystem.

Given a list of files (such as files in a git commit) it can detect which checkers to run against select files. 

Given the string contents of a package manager file the library can detect dependencies in the file and optionally attempt to lookup the license of the detected dependency. 

### Using the library locally

```javascript
const LicenseLookup = require("license-lookup")

//File listing to match with the available license resolvers
const files = fs.readdirSync("/path");

var ll = new LicenseLookup();
var matches = ll.matchFilesToManager(files);

//each match has a filepath and the matched manager
for(const match of matches){
  var content = fs.readFileSync(match.file, "utf8");
  var detectedDependencies = await match.manager.detect(content);
  
  for(var dep of detectedDependencies){
     console.log(`Name: ${dep.name}, Found: ${dep.found}, Url: ${dep.url}, License: ${dep.license}`);
  }
}
```

### Using with github api
As the library was designed to work with only having api access to files and the content, you can use it with octokit to check the contents of a pull request on GitHub:

```javascript
const Octokit = require('@octokit/rest')
const LicenseLookup = require("license-lookup")

const octokit = new Octokit ()


//File listing from a PR
const files = await octokit.pullRequests.listFiles({repo, owner, number});

var ll = new LicenseLookup();
var matches = ll.matchFilesToManager(files);

//each match has a filepath and the matched manager
for(const match of matches){
  //compare base and head
  var base = await octokit.repos.getContents( {repo, owner, path: match.file,});
  var head = await octokit.repos.getContents( {repo, owner, path: match.file, ref: ref})
      
  const base_content = Buffer.from(base.data.content, 'base64').toString()
  const head_content = Buffer.from(head.data.content, 'base64').toString()

  var base_deps = await match.manager.detect(base_content);
  var head_deps = await match.manager.detect(head_content);
  
  var baseDepsKeys = base_deps.map(x => x.name);
  var new_deps = head_deps.filter( x => baseDepsKeys.indexOf(x.name)<0 );
  var detectedDependencies = await match.manager.lookup(new_deps);
  
  // list new dependencies introduced in PR
  for(var dep of detectedDependencies){
     console.log(`Name: ${dep.name}, Found: ${dep.found}, Url: ${dep.url}, License: ${dep.license}`);
  }
}
```


### Todo
- [x] Add npm support
- [x] Add pip support
- [x] Add SBT support
- [x] Add maven support
- [x] Add gradle support
- [ ] Add pom.xml support
- [ ] Add yarn support

### Developing

This library is written in typescript and uses jest for testing.  

Git clone and run:
```
npm install
npm run-script build
npm t
```
