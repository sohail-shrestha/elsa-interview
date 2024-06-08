import { NextFunction, Request, Response } from "express";
declare const validateRequestParams: (req: Request, res: Response, next: NextFunction) => void;
export { validateRequestParams };
