import { useState } from "react"
import { ModalCostume } from "../../../../shared/Components/ModalCostume"
import { TabCostume } from "../../../../shared/Components/TabCostume"
import { AdapterConfigModal } from "../../Infraestructure/AdapterConfigData";
import { FormDynamic } from "./FormDynamic";
import { EntityGenericForm } from "../../../../shared/Domain/EntityGenericForm";

interface ContainerProps {
    form: EntityGenericForm<any>;
    onChangeForm: Function;
    show: boolean;
    closeModal: Function;
    onSubmit: Function;
}

export const ModalConfig = (props: ContainerProps) => {
    const [currentKeyTab, setCurrentKeyTab] = useState<string>(AdapterConfigModal.defaultKey);

    return (
        <ModalCostume
            title="Configuración"
            textButtonSubmit='Guardar'
            close={props.closeModal}
            submit={props.onSubmit}
            show={props.show}
            width={900}
        >
            <TabCostume
                onChange={(key) => setCurrentKeyTab(() => (key))}
                defaultKey={AdapterConfigModal.defaultKey}
                options={AdapterConfigModal.options}
            >
                <>
                    <FormDynamic
                        form={props.form}
                        inputs={AdapterConfigModal.Form[currentKeyTab]}
                        onChangeForm={props.onChangeForm}
                    />
                </>
            </TabCostume>
        </ModalCostume>
    )
}