import { NextFunction, Request, Response } from "express";

const validateRequestParams = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params
    if(Object.hasOwn(params, params.answer) && Object.hasOwn(params, params.questionId) && Object.hasOwn(params, params.userId) &&  Object.hasOwn(params, params.quizId)){
        next()
    }else{
        res.status(400).json({
            status: "error",
            message: "Invalid Request: Please make sure request params have keys answer, questionId, userId, quizId"
        })
    }
}

export {validateRequestParams}