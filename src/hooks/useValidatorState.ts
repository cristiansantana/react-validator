import { useState } from "react";
import { getErrorHandler, hasErrorHandler, clearErrorHandler } from "../clientErrorHandlers";
import { ErrorPath, ValidatorErrorItem } from "../validatorTypes";

const useValidatorState = () => {
    const [errors, setErrors] = useState<ValidatorErrorItem[]>([]);

    const getError = (path: ErrorPath) => getErrorHandler({ path, errors });

    const hasError = (path?: ErrorPath) => hasErrorHandler({ path, errors });

    const clearError = (path: ErrorPath) => clearErrorHandler({ path, errors, setErrors });

    return {
        clearError,
        getError,
        hasError,
        setErrors,
    };
};

export default useValidatorState;
