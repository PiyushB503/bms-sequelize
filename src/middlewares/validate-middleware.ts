import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult, ValidationChain } from "express-validator";

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Still return, but do NOT type the function as returning Response
    res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  };
};
