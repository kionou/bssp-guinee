import { helpers, required, email, minLength, maxLength ,maxValue, numeric, sameAs } from "@vuelidate/validators";

const require = helpers.withMessage('Ce champs est obligatoire!',required)
const lgmin = (min) => helpers.withMessage(`Ce champ doit avoir au moins ${min} caractères!`, minLength(min));
const lgmax = (max) => helpers.withMessage(`Ce champ doit avoir au plus ${max} caractères!`, maxLength(max));
const vlmin = (min) => helpers.withMessage(`Ce champ doit avoir au moins ${min} valeurs!`, minValue(min));
const vlmax = (max) => helpers.withMessage(`Ce champ doit avoir au plus ${max} valeurs!`, maxValue(max));
const ValidEmail = helpers.withMessage(`La valeur n'est pas une adresse e-mail valide!`, email);
const ValidNumeri = numeric;
const sameAsPassword = helpers.withMessage('Mot de passe non identique!', sameAs);
const hasUppercase = helpers.regex('hasUppercase', /^(?=.*[A-Z])/);
const hasUppercaseWithCustomMessage = helpers.withMessage("Le mot de passe doit contenir au moins une lettre majuscule.", hasUppercase);

export {
    require,
    lgmin,
    lgmax,
    ValidEmail,
    ValidNumeri,
    vlmin,
    vlmax,
    sameAsPassword,
    hasUppercaseWithCustomMessage
};

