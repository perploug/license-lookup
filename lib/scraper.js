"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var x_ray_1 = __importDefault(require("x-ray"));
var Scraper = /** @class */ (function () {
    function Scraper() {
    }
    Scraper.prototype.get = function (url, data) {
        return new Promise(function (resolve, reject) {
            var xray = x_ray_1.default();
            xray(url, data)(function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return Scraper;
}());
exports.Scraper = Scraper;
//# sourceMappingURL=scraper.js.map