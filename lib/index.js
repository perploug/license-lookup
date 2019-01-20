"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var managers_1 = require("./managers");
var DependencyLicense = /** @class */ (function () {
    function DependencyLicense() {
        this.manager = new managers_1.ManagerFactory();
        this.managers = this.manager.managers;
    }
    DependencyLicense.prototype.matchFilesToManager = function (paths) {
        return this.manager.matchFilesToManagers(paths);
    };
    return DependencyLicense;
}());
exports.DependencyLicense = DependencyLicense;
//# sourceMappingURL=index.js.map