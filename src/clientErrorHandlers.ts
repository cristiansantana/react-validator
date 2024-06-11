import { ErrorPath, ValidatorErrorItem } from "./validatorTypes";

export const getErrorHandler = ({ path, errors }: { path: ErrorPath; errors: ValidatorErrorItem[] }) => {
    const errorArray = typeof path === "string" ? [path] : path;
    const error = errors.find((error) => error.path.join(".") === errorArray.join("."));
    if (error) {
        return error.message;
    } else {
        return undefined;
    }
};

export const hasErrorHandler = ({ path, errors }: { path?: ErrorPath; errors: ValidatorErrorItem[] }) => {
    if (path) {
        return getErrorHandler({ path, errors }) !== undefined;
    } else {
        return errors.length > 0;
    }
};

export const clearErrorHandler = ({
    path,
    errors,
    setErrors,
}: {
    path: ErrorPath;
    errors: ValidatorErrorItem[];
    setErrors: (errors: ValidatorErrorItem[]) => void;
}) => {
    const errorArray = typeof path === "string" ? [path] : path;
    setErrors(errors.filter((error) => error.path.join(".") !== errorArray.join(".")));
};
