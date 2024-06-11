import Joi from "joi";
import mapValidatorErrors from "./mapValidatorErrors";
import messages from "./locales";
import { ValidatorErrorItem, ValidatorLanguage } from "./validatorTypes";

class Validator<T extends Joi.PartialSchemaMap> {
    private schemaObject: Joi.ObjectSchema;
    private options: Joi.ValidationOptions;

    errors: ValidatorErrorItem[] = [];

    constructor(private schema: T, language: ValidatorLanguage = "en") {
        this.schemaObject = Joi.object(schema);
        this.options = {
            abortEarly: true,
            messages,
            errors: {
                language,
            },
        };
    }

    validate = <D extends {}>(data: D) => {
        const result = this.schemaObject.validate(data, this.options);

        if (result.error) {
            this.errors = mapValidatorErrors(result.error.details);
            return false;
        } else {
            return result.value as D;
        }
    };

    validateAsync = async <D extends {}>(data: D) => {
        try {
            const value = await this.schemaObject.validateAsync(data);
            return value as D;
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                this.errors = mapValidatorErrors(error.details);
                return false;
            } else {
                throw error;
            }
        }
    };
}

export {
    Validator,
    ValidatorErrorItem,
};
