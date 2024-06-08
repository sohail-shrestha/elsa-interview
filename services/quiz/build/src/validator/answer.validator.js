"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestParams = void 0;
var validateRequestParams = function (req, res, next) {
    var params = req.params;
    if (Object.hasOwn(params, params.answer) && Object.hasOwn(params, params.questionId) && Object.hasOwn(params, params.userId) && Object.hasOwn(params, params.quizId)) {
        next();
    }
    else {
        res.status(400).json({
            status: "error",
            message: "Invalid Request: Please make sure request params have keys answer, questionId, userId, quizId"
        });
    }
};
exports.validateRequestParams = validateRequestParams;
//# sourceMappingURL=answer.validator.js.map