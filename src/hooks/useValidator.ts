import { useState } from "react";
import Joi from "joi";
import { getErrorHandler, hasErrorHandler, clearErrorHandler } from "../clientErrorHandlers";
import mapValidatorErrors from "../mapValidatorErrors";
import { ErrorPath, ValidatorErrorItem } from "../validatorTypes";

const useValidator = <T extends Joi.PartialSchemaMap>(schema: T) => {
    const [errors, setErrors] = useState<ValidatorErrorItem[]>([]);

    const options: Joi.ValidationOptions = {
        abortEarly: true,
        messages: {
            "string.required": "This field is required",
            "string.empty": "This field cannot be empty",
            "string.email": "This field must be a valid email address",
            "string.min": "This field must be at least {#limit} characters long",
        },
    };

    const schemaObject = Joi.object(schema);

    const validate = <T extends {}>(data: T) => {
        const result = schemaObject.validate(data, options);
        if (result.error) {
            setErrors(mapValidatorErrors(result.error.details));
            return false;
        } else {
            setErrors([]);
            return result.value as T;
        }
    };

    const validateAsync = async <T extends {}>(data: T) => {
        try {
            await schemaObject.validateAsync(data);
            setErrors([]);
            return true;
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                setErrors(mapValidatorErrors(error.details));
                return false;
            } else {
                throw error;
            }
        }
    };

    const getError = (path: ErrorPath) => getErrorHandler({ path, errors });

    const hasError = (path?: ErrorPath) => hasErrorHandler({ path, errors });

    const clearError = (path: ErrorPath) => clearErrorHandler({ path, errors, setErrors });

    return {
        clearError,
        getError,
        hasError,
        validate,
        validateAsync,
    };
};

export default useValidator;
