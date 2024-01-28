import { useState } from "react"
import { EntityContent, EntityContentInit } from "../Domain/EntityContent"
import { EntityConfigModal, EntityConfigModalInit, EntityDocument } from "../Domain/Utils";
import IconTrash from "../../../assets/icons/icon-trash.svg";

export const Controller = () => {
    const [content, setContent] = useState<EntityContent>(EntityContentInit);
    const [configModal, setConfigModal] = useState<EntityConfigModal>(EntityConfigModalInit);
    const [loading, setLoading] = useState<boolean>(false);

    const init = () => {
        setContent({
            listDocument: [
                { key: '1', nroDocumento: 'F010-00000001', type: 'FA' },
                { key: '2', nroDocumento: 'F010-00000002', type: 'FA' },
                { key: '3', nroDocumento: 'F010-00000003', type: 'FA' },
                { key: '4', nroDocumento: 'F010-00000004', type: 'FA' },
                { key: '5', nroDocumento: 'F010-00000005', type: 'FA' },
            ],
            metadataDocument: [
                { key: 'type', label: 'Tipo' },
                { key: 'nroDocumento', label: 'Nro. de documento' },
                { key: 'actionDelete', label: '', render: (row: EntityDocument) => <img className="iconDeleteTable" src={IconTrash} alt="icon-trash"/> },
            ],
            listMain: [
                { key: '1', razonSocial: 'Jerson Miranda', nroDocumento: 'F010-00000001', type: 'FA', fechaEmision: '20/10/2023', fechaEnvio: '20/10/2023', estado: 'Aceptado', observacion: '' },
                { key: '2', razonSocial: 'Jerson Miranda', nroDocumento: 'F010-00000002', type: 'FA', fechaEmision: '20/10/2023', fechaEnvio: '20/10/2023', estado: 'Rechazado', observacion: 'Time out request' },
                { key: '3', razonSocial: 'Jerson Miranda', nroDocumento: 'F010-00000002', type: 'FA', fechaEmision: '20/10/2023', fechaEnvio: '20/10/2023', estado: 'Pendiente', observacion: '' },
                { key: '4', razonSocial: 'Jerson Miranda', nroDocumento: 'F010-00000002', type: 'FA', fechaEmision: '20/10/2023', fechaEnvio: '20/10/2023', estado: 'Enviado', observacion: 'Esperando CDR' },
            ],
            metadataMain: [
                { key: 'razonSocial', label: 'Razón social' },
                { key: 'nroDocumento', label: 'Nro. de documento' },
                { key: 'type', label: 'Tipo' },
                { key: 'fechaEmision', label: 'F. de Emisión' },
                { key: 'fechaEnvio', label: 'F. de envío' },
                { key: 'estado', label: 'Estado' },
                { key: 'observacion', label: 'Observación' },
                { key: 'actionDelete', label: '', render: (row: EntityDocument) => <img className="iconDeleteTable" src={IconTrash} alt="icon-trash"/> }
            ],
            listStatus: [
                { label: 'Aceptado', value: 'A' },
                { label: 'Rechazado', value: 'R' },
                { label: 'Pendiente', value: 'P' },
                { label: 'Enviado', value: 'E' },
            ]
        })
    };

    // Functions Modal
    const openModal = () => {
        setConfigModal((prev) => ({ ...prev, show: true }));
    }

    const closeModal = () => {
        setConfigModal((prev) => ({ ...prev, show: false }))
    }

    const onSubmitModal = () => {
        setLoading(true);
        setTimeout(() => {
            closeModal();
            setLoading(false);
        }, 3000)
    }

    return ({
        content,
        init,
        loading,

        openModal,
        closeModal,
        configModal,
        onSubmitModal
    })
}