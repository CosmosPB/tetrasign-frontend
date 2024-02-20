import { FormikErrors, FormikValues } from "formik";

export interface EntityGenericForm<T> {
    values: FormikValues;
    errors: FormikErrors<T>;
}