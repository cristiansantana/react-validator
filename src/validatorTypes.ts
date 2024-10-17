export type ValidatorLanguage =
    | "en"
    | "es-419"
    | "es-AR"
    | "es-BO"
    | "es-CL"
    | "es-CO"
    | "es-EC"
    | "es-ES"
    | "es-PE"
    | "es-PY"
    | "es-UY"
    | "es-VE";

export type ErrorPathArray = (string | number)[];

export type ErrorPath = string | ErrorPathArray;

export interface ValidatorErrorItem {
    message: string;
    path: ErrorPathArray;
}
