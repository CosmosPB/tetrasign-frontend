import { useFormik } from "formik";

export const ControllerModalConfig = () => {
    const form = useFormik({
        initialValues: {},
        onSubmit: () => {},
    })

    const onChange = (name: string, value: any) => {
        form.setFieldValue(name, value);
    }

    const onSubmit = () => {

    }

    return ({
        form,
        onChange,
        onSubmit
    })
}