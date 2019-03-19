"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var maven_base_1 = require("./maven.base");
var pomparser = require("pom-parser");
var Pom = /** @class */ (function (_super) {
    __extends(Pom, _super);
    function Pom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Pom";
        _this.globs = ["pom.xml"];
        return _this;
    }
    Pom.prototype.detect = function (manifest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var opts = { xmlContent: manifest };
                        pomparser.parse(opts, function (err, pom) {
                            var detected = [];
                            if (pom &&
                                pom.pomObject &&
                                pom.pomObject.project &&
                                pom.pomObject.project.dependencies &&
                                pom.pomObject.project.dependencies.dependency) {
                                var model = pom.pomObject.project.dependencies.dependency;
                                for (var _i = 0, model_1 = model; _i < model_1.length; _i++) {
                                    var dep = model_1[_i];
                                    // extract name and clean it up
                                    var name = dep.artifactid.replace(/[^0-9a-z.:\-\_]/gi, "");
                                    // if the group has a group id, include this in the fully qualified name
                                    if (dep.groupid && dep.groupid !== "" && name.indexOf(":") < 0) {
                                        name = dep.groupid + ":" + name;
                                    }
                                    detected.push({ name: name, version: dep.version });
                                }
                            }
                            resolve(detected);
                        });
                    })];
            });
        });
    };
    return Pom;
}(maven_base_1.MavenBase));
exports.Pom = Pom;
//# sourceMappingURL=pom.js.map