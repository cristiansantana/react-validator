import Joi from "joi";
import { ValidatorErrorItem } from "./validatorTypes";

const mapValidatorErrors = (errors: Joi.ValidationErrorItem[]): ValidatorErrorItem[] => {
    return errors.map((error) => {
        return {
            path: error.path,
            message: error.message,
        };
    });
};

export default mapValidatorErrors;
