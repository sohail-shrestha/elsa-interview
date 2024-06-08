"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.quizExists = exports.getQuizById = exports.getAllQuiz = exports.generateQuiz = void 0;
var question_entity_1 = require("@elsa-test/common/src/database/entities/question.entity");
var quiz_entity_1 = require("@elsa-test/common/src/database/entities/quiz.entity");
var index_1 = require("@elsa-test/common/src/index");
var getAllQuiz = function () {
    return index_1.AppDataSource.getRepository(quiz_entity_1.Quiz).find({
        relations: { questions: true },
    });
};
exports.getAllQuiz = getAllQuiz;
var getQuizById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.AppDataSource.getRepository(quiz_entity_1.Quiz).findOne({
                where: { id: id },
                relations: { questions: true },
            })];
    });
}); };
exports.getQuizById = getQuizById;
var buildOptions = function (questionId) { return __awaiter(void 0, void 0, void 0, function () {
    var randomOptions, correctOption, randomIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.AppDataSource.getRepository(question_entity_1.Question)
                    .createQueryBuilder("question")
                    .where("question.id != :id", { id: questionId })
                    .orderBy("RANDOM()")
                    .limit(3)
                    .getMany()
                    .then(function (questions) { return questions.map(function (question) { return question.answer; }); })];
            case 1:
                randomOptions = _a.sent();
                return [4 /*yield*/, index_1.AppDataSource.getRepository(question_entity_1.Question).findOne({
                        where: { id: questionId },
                    })];
            case 2:
                correctOption = _a.sent();
                randomIndex = Math.floor(Math.random() * (randomOptions.length + 1));
                if (correctOption) {
                    randomOptions.splice(randomIndex, 0, correctOption.answer);
                }
                return [2 /*return*/, randomOptions];
        }
    });
}); };
var generateQuestionsForQuiz = function (quiz) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(quiz.questions.map(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                    var options;
                    var id = _b.id, question = _b.question;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, buildOptions(id)];
                            case 1:
                                options = _c.sent();
                                return [2 /*return*/, {
                                        id: id,
                                        question: question,
                                        options: options,
                                    }];
                        }
                    });
                }); }))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var generateQuiz = function (quizId) { return __awaiter(void 0, void 0, void 0, function () {
    var quiz, questions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, quizExists(quizId)];
            case 1:
                if ((_a.sent()) === false) {
                    throw new Error("Quiz with id ".concat(quizId, " doesn't exist."));
                }
                return [4 /*yield*/, getQuizById(quizId)];
            case 2:
                quiz = _a.sent();
                return [4 /*yield*/, generateQuestionsForQuiz(quiz)];
            case 3:
                questions = _a.sent();
                return [2 /*return*/, {
                        id: quiz.id,
                        questions: questions,
                    }];
        }
    });
}); };
exports.generateQuiz = generateQuiz;
var quizExists = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.AppDataSource.getRepository(quiz_entity_1.Quiz).exists({ where: { id: id } })];
    });
}); };
exports.quizExists = quizExists;
//# sourceMappingURL=quiz.service.js.map