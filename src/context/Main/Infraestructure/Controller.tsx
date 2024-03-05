import { useState } from "react"
import { EntityContent, EntityContentInit } from "../Domain/EntityContent"
import { EntityConfigModal, EntityConfigModalInit, EntityDocument } from "../Domain/Utils";
import IconTrash from "../../../assets/icons/icon-trash.svg";
import { AdapterToast } from "../../../shared/Adapters/ToastMessage";

export const Controller = () => {
    const [content, setContent] = useState<EntityContent>(EntityContentInit);
    const [configModal, setConfigModal] = useState<EntityConfigModal>(EntityConfigModalInit);
    const [loading, setLoading] = useState<boolean>(false);

    const init = () => {
        setContent({
            listDocument: [
            ],
            metadataDocument: [
                { key: 'type', label: 'Tipo' },
                { key: 'nroDocumento', label: 'Nro. de documento' },
                { key: 'actionDelete', label: '', render: (row: EntityDocument, position) => <img onClick={() => deleteFile(position)} className="iconDeleteTable" src={IconTrash} alt="icon-trash"/> },
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

            AdapterToast.message("success", "Se envío de forma correcta a la SUNAT", { position: "bottom-right" });
        }, 3000)
    }

    // Functions File Temp
    const onChangeFile = (value: Array<File>) => {
        const formatted: Array<EntityDocument> = value.map((row, index) => ({
            key: `${row.name}`,
            nroDocumento: row.name,
            type: 'FA',
            file: row
        }))

        setContent((prev) => ({
            ...prev,
            listDocument: [
                ...prev.listDocument,
                ...formatted
            ]
        }))
    }

    const deleteFile = (position: number) => {
        let temp = content.listDocument;
        temp.splice(position, 1);

        setContent((prev) => ({
            ...prev,
            listDocument: temp
        }))
    }

    return ({
        content,
        init,
        loading,

        openModal,
        closeModal,
        configModal,
        onSubmitModal,
        
        // Functions File Temp
        onChangeFile,
    })
}