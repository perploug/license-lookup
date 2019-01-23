"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var managers_1 = require("./managers");
var LicenseLookup = /** @class */ (function () {
    function LicenseLookup() {
        this.manager = new managers_1.ManagerFactory();
        this.managers = this.manager.managers;
    }
    LicenseLookup.prototype.matchFilesToManager = function (paths) {
        return this.manager.matchFilesToManagers(paths);
    };
    return LicenseLookup;
}());
exports.LicenseLookup = LicenseLookup;
//# sourceMappingURL=index.js.map