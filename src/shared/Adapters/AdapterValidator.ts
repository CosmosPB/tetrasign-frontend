import { FormikErrors } from "formik";

export class AdapterValidator {
    public static validate(validate: FormikErrors<object>): void {
        let valueValidate: Array<string> = Object.values(validate);
        if (!!valueValidate.length) {
            let message: string = valueValidate.map(row => typeof row === 'object' ? row['_id'] : row).join('\n\n');
            throw Error(message);
        }

    }
}