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
            {/** Contener para la pantalla principal */}
            <ViewMain
                content={controller.content}
                openModal={controller.openModal}
                openFormConfigModal={() => controllerModalConfig.onChangeFormConfigModal(true)}
                onChangeFile={controller.onChangeFile}
            />

            {/** Contener para Modal enviar a SUNAT */}
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

            {/** Contener para el modal de configuración */}
            <ModalConfig
                form={controllerModalConfig.form}
                onChangeForm={controllerModalConfig.onChange}
                onSubmit={controllerModalConfig.onSubmit}
                closeModal={() => controllerModalConfig.onChangeFormConfigModal(false)}
                show={controllerModalConfig.formConfigModal}
            />

            {/** Contener para mostrar una pantalla de carga */}
            <LoadingCostume loading={controller.loading} />

            {/** Contener para mostrar los mensajes */}
            <ToastContainer />

        </>
    )
}

export default View;