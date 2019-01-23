# License Lookup
Lightweight package dependency License detector designed to run without access to the entire filesystem.

Given a list of files (such as files in a git commit) it can detect which checkers to run against select files. 

Given the string contents of a package manager file the library can detect dependencies in the file and optionally attempt to lookup the license of the detected dependency. 

### Using the library


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






