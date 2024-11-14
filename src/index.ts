import Joi, { ValidationError } from "joi";
import mapValidatorErrors from "./mapValidatorErrors";
import messages from "./locales";
import { ValidatorErrorItem, ValidatorLanguage } from "./validatorTypes";

class Validator<T extends Joi.PartialSchemaMap> {
    private schemaObject: Joi.ObjectSchema<T>;
    private options: Joi.ValidationOptions;

    errors: ValidatorErrorItem[] = [];

    constructor(schema: T, language: ValidatorLanguage = "en") {
        this.schemaObject = Joi.object(schema);
        this.options = {
            abortEarly: false,
            messages,
            errors: {
                language,
            },
        };
    }

    validate = (data: any) => {
        const result = this.schemaObject.validate(data, this.options);

        if (result.error) {
            this.errors = mapValidatorErrors(result.error.details);
            return false;
        } else {
            return result.value;
        }
    };

    validateAsync = async (data: any) => {
        try {
            const value = await this.schemaObject.validateAsync(data, this.options);
            return value;
        } catch (error) {
            if (isJoiError(error)) {
                this.errors = mapValidatorErrors(error.details);
                return false;
            } else {
                throw error;
            }
        }
    };
}

const isJoiError = (error: any): error is ValidationError => {
    return error.name === "ValidationError";
};

export {
    Validator,
    ValidatorErrorItem,
};
