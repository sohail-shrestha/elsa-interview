"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRoute = void 0;
var express_1 = __importDefault(require("express"));
var quiz_controller_1 = require("./controller/quiz.controller");
var app = (0, express_1.default)();
exports.quizRoute = app;
app.use("/quiz", quiz_controller_1.quizController);
//# sourceMappingURL=routes.js.map