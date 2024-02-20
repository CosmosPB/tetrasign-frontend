import { InputText } from "../../../../shared/Components/InputCostume";
import { EntityGenericForm } from "../../../../shared/Domain/EntityGenericForm";
import './FormDynamic.scss';

interface ContainerProps {
    form: EntityGenericForm<any>;
    onChangeForm: Function;
    inputs: { type: 'string'; required: boolean; label: string; key: string; }[];
}

export const FormDynamic = (props: ContainerProps) => {
    return (
        <div className="FormDynamic">
            <div className="group-inputs">
                {
                    props.inputs.map(row =>
                        <div className="item-input">
                            <label>{ row.label } {row.required ? <span className="required">*</span> : null}</label>
                            <InputText
                                label={row.label}
                                name={row.key}
                                onChange={(name, value) => props.onChangeForm(name, value)}
                                value={props.form.values[row.key]}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}