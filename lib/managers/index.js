"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm_1 = require("./npm");
var pip_1 = require("./pip");
var sbt_1 = require("./sbt");
var gradle_1 = require("./gradle");
var requirements_1 = require("./requirements");
var pom_1 = require("./pom");
var gem_1 = require("./gem");
var poetry_1 = require("./poetry");
var minimatch = require("minimatch");
// Holds all dependency managers, based on a collection of paths, can determine if
// any manager should attept to try to look up dependencies
var ManagerFactory = /** @class */ (function () {
    function ManagerFactory() {
        this.managers = new Array();
        this.managers.push(new npm_1.Npm());
        this.managers.push(new pip_1.Pip());
        this.managers.push(new sbt_1.Sbt());
        this.managers.push(new gradle_1.Gradle());
        this.managers.push(new requirements_1.Requirements());
        this.managers.push(new pom_1.Pom());
        this.managers.push(new gem_1.Gem());
        this.managers.push(new poetry_1.Poetry());
    }
    // this will return a list of files to process, 
    // along with the manager to process it with.
    ManagerFactory.prototype.matchFilesToManagers = function (paths) {
        var result = [];
        for (var _i = 0, _a = this.managers; _i < _a.length; _i++) {
            var manager = _a[_i];
            for (var _b = 0, _c = manager.globs; _b < _c.length; _b++) {
                var pattern = _c[_b];
                for (var _d = 0, _e = minimatch.match(paths, pattern, { matchBase: true }); _d < _e.length; _d++) {
                    var file = _e[_d];
                    result.push({ file: file, manager: manager });
                }
            }
        }
        return result;
    };
    return ManagerFactory;
}());
exports.ManagerFactory = ManagerFactory;
//# sourceMappingURL=index.js.map