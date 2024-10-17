import en from "./en";
import es419 from "./es-419";
import esAR from "./es-AR";
import esBO from "./es-BO";
import esCL from "./es-CL";
import esCO from "./es-CO";
import esEC from "./es-EC";
import esES from "./es-ES";
import esPE from "./es-PE";
import esPY from "./es-PY";
import esUY from "./es-UY";
import esVE from "./es-VE";

import Joi from "joi";

const messages: Joi.LanguageMessages = {
    en,
    "es-419": es419,
    "es-AR": esAR,
    "es-BO": esBO,
    "es-CL": esCL,
    "es-CO": esCO,
    "es-EC": esEC,
    "es-ES": esES,
    "es-PE": esPE,
    "es-PY": esPY,
    "es-UY": esUY,
    "es-VE": esVE,
};

export default messages;
