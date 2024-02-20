import { useEffect } from "react";
import { ViewMain } from "./Components/ViewMain";
import { Controller } from "./Infraestructure/Controller";
import { ModalCostume } from "../../shared/Components/ModalCostume";
import { LoadingCostume } from "../../shared/Components/LoadingCostume";
import { ToastContainer } from 'react-toastify';
import { ModalConfig } from "./Components/Modal/ModalConfig";
import { ControllerModalConfig } from "./Infraestructure/ControllerModalConfig";

const View = () => {
    const controller = Controller();
    const controllerModalConfig = ControllerModalConfig();

    useEffect(() => {
        controller.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ViewMain
                content={controller.content}
                openModal={controller.openModal}
                openFormConfigModal={() => controller.onChangeFormConfigModal(true)}
                onChangeFile={controller.onChangeFile}
            />

            <ModalCostume
                title={controller.configModal.title}
                show={controller.configModal.show}
                close={controller.closeModal}
                submit={controller.onSubmitModal}
            >
                <p>
                    ¿Desea enviar los archivos seleccionados a la Sunat? Una vez sea aprobado,
                    se enviará por correo el comprobante electrónico al cliente.
                </p>
            </ModalCostume>
            <LoadingCostume
                loading={controller.loading}
            />
            <ModalConfig
                form={controllerModalConfig.form}
                onChangeForm={controllerModalConfig.onChange}
                onSubmit={controllerModalConfig.onSubmit}
                closeModal={() => controller.onChangeFormConfigModal(false)}
                show={controller.formConfigModal}
            />
            <ToastContainer />
        </>
    )
}

export default View;