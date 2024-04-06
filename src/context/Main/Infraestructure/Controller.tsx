import { useState } from "react"
import { EntityContent, EntityContentInit } from "../Domain/EntityContent"
import { EntityConfigModal, EntityConfigModalInit, EntityDocument, EntityItemDocument } from "../Domain/Utils";
import IconTrash from "../../../assets/icons/icon-trash.svg";
import { AdapterToast } from "../../../shared/Adapters/ToastMessage";
import { AdapterService } from "../../../shared/Adapters/AdapterService";
import { EntityResponseListDespatchService } from "../Domain/EntityResponse";
import { AdapterGeneric } from "../../../shared/Adapters/AdapterGeneric";

let listKeySelectTable: string[] = [];

export const Controller = () => {
    const [content, setContent] = useState<EntityContent>(EntityContentInit);
    const [configModal, setConfigModal] = useState<EntityConfigModal>(EntityConfigModalInit);
    const [loading, setLoading] = useState<boolean>(false);
    const adapterService = new AdapterService();

    const init = () => {
        setContent({
            listDocument: [
            ],
            metadataDocument: [
                { key: 'type', label: 'Tipo' },
                { key: 'nroDocumento', label: 'Nro. de documento' },
                { key: 'actionDelete', label: '', render: (row: EntityDocument, position) => <img onClick={() => deleteFile(position)} className="iconDeleteTable" src={IconTrash} alt="icon-trash"/> },
            ],
            listMain: [],
            metadataMain: [
                { key: 'razonSocial', label: 'Razón social' },
                { key: 'nroDocumento', label: 'Nro. de documento' },
                { key: 'type', label: 'Tipo' },
                { key: 'fechaEmision', label: 'F. de Emisión' },
                { key: 'fechaEnvio', label: 'F. de envío' },
                { key: 'estado', label: 'Estado' },
                { key: 'observacion', label: 'Observación' },
                { key: 'actionDelete', label: '', render: (row: EntityItemDocument) => <img className="iconDeleteTable" onClick={() => onDeleteDocument(row)} src={IconTrash} alt="icon-trash"/> }
            ],
            listStatus: [
                { label: 'Aceptado', value: 'A' },
                { label: 'Rechazado', value: 'R' },
                { label: 'Pendiente', value: 'P' },
                { label: 'Enviado', value: 'E' },
            ]
        })

        onGetListDocument();
    };

    // Functions lista
    const onChangeCheckedList = (list: string[]) => {
        listKeySelectTable = list;
    }

    const onGetListDocument = async () => {
        try {
            setLoading(true);
            const result = await adapterService.getData<EntityResponseListDespatchService[]>('/documents/despatch-advices', {}, true, null);
            const list = result.map(row => 
                ({
                    key: row.id,
                    razonSocial: row.data.business_name || '-',
                    nroDocumento: row.document_id || '-',
                    type: row.document_type || '-',
                    fechaEmision: row.issue_date ? AdapterGeneric.convertDateToString(new Date(row.issue_date), 2) : '-',
                    fechaEnvio: row.send_date ? AdapterGeneric.convertDateToString(new Date(row.send_date), 2) : '-',
                    estado: row.state || '-',
                    observacion: row.observation || '-',
                    dataComplete: row
                })
            )
            
            setContent((prev) => ({
                ...prev,
                listMain: list
            }))
        } catch (error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }

    const onDeleteDocument = async (item: EntityItemDocument) => {
        try {
            setLoading(true);
            await adapterService.deleteData(`/documents/despatch-advices/${item.dataComplete.id}`, true, null);
            await onGetListDocument();
            AdapterToast.message("success", "¡Eliminado de forma exitosa!", { position: "top-right" });
        } catch (error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }

    const onCheckCDRDocument = async () => {
        if (listKeySelectTable.length === 0) {
            AdapterToast.message('error', 'Debe seleccionar mínimo un documento');
            return;
        }

        try {
            setLoading(true);
            const filtered = content.listMain.filter(row => listKeySelectTable.includes(row.dataComplete.id));
            const payload = filtered.reduce((prev, current) => {
                prev.filenames = {
                    [current.dataComplete.id]: current.dataComplete.document_id
                };
                return prev;
            }, { filenames: {} as any });
            
            await adapterService.postData(`/documents/check-cdr`, payload, true, null);
            await onGetListDocument();
            AdapterToast.message("success", "¡Actualizado!", { position: "top-right" });
        } catch (error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }

    const onSendSunatDocument = async () => {
        if (listKeySelectTable.length === 0) {
            AdapterToast.message('error', 'Debe seleccionar mínimo un documento');
            return;
        }

        try {
            setLoading(true);
            const filtered = content.listMain.filter(row => listKeySelectTable.includes(row.dataComplete.id));
            const payload = filtered.reduce((prev, current) => {
                prev.filenames = {
                    [current.dataComplete.id]: current.dataComplete.document_id
                };
                return prev;
            }, { filenames: {} as any });
            
            await adapterService.postData(`/documents/send-sunat`, payload, true, null);
            await onGetListDocument();
            closeModal();
            AdapterToast.message("success", "Se envío de forma correcta a la SUNAT", { position: "top-right" });
        } catch (error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }

    // Functions Modal
    const openModal = () => {
        setConfigModal((prev) => ({ ...prev, show: true }));
    }

    const closeModal = () => {
        setConfigModal((prev) => ({ ...prev, show: false }))
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

    // Functions - Convertir XML y Firmar
    const convertXMLSign = async () => {
        if (content.listDocument.length === 0) {
            AdapterToast.message('error', 'Debe seleccionar archivos antes de Convertir a XML y firmar');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            for (const row of content.listDocument)
                formData.append('files', row.file, row.file.name);

            await adapterService.postData(`/documents`, formData, true, null)

            AdapterToast.message("success", "¡Guardado de forma exitosa!", { position: "top-right" });
            setContent((prev) => ({
                ...prev,
                listDocument: []
            }))
        } catch(error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }

    return ({
        content,
        init,
        loading,

        openModal,
        closeModal,
        configModal,
        
        // Functions File Temp
        onChangeFile,

        // Function convertir a XML y firmar
        convertXMLSign,

        // Functions List
        onCheckCDRDocument,
        onSendSunatDocument,
        onChangeCheckedList
    })
}