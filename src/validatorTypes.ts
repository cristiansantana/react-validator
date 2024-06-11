export type ValidatorLanguage = "en" | "es";

export type ErrorPathArray = (string | number)[];

export type ErrorPath = string | ErrorPathArray;

export interface ValidatorErrorItem {
    message: string;
    path: ErrorPathArray;
};
