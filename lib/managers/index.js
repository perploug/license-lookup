"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm_1 = require("./npm");
var pip_1 = require("./pip");
var minimatch = require("minimatch");
// Holds all dependency managers, based on a collection of paths, can determine if
// any manager should attept to try to look up dependencies
var ManagerFactory = /** @class */ (function () {
    function ManagerFactory() {
        this.managers = new Array();
        this.managers.push(new npm_1.Npm());
        this.managers.push(new pip_1.Pip());
    }
    // this will return a list of files to process, 
    // along with the manager to process it with.
    ManagerFactory.prototype.matchFilesToManagers = function (paths) {
        var result = {};
        for (var _i = 0, _a = this.managers; _i < _a.length; _i++) {
            var manager = _a[_i];
            for (var _b = 0, _c = manager.globs; _b < _c.length; _b++) {
                var pattern = _c[_b];
                for (var _d = 0, _e = minimatch.match(paths, pattern, { matchBase: true }); _d < _e.length; _d++) {
                    var file = _e[_d];
                    if (file && !result[file]) {
                        result[file] = manager;
                    }
                }
            }
        }
        return result;
    };
    return ManagerFactory;
}());
exports.ManagerFactory = ManagerFactory;
//# sourceMappingURL=index.js.map