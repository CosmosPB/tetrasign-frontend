import { EntityDocument } from "./EntityDocument";

export interface EntityContent {
    listDocument: EntityDocument[];
    metadataDocument: {
        key: string;
        label: string;
        render?: (row: any) => any;
    }[];
    listMain: {
        key: string;
        razonSocial: string;
        nroDocumento: string;
        type: string;
        fechaEmision: string;
        fechaEnvio: string;
        estado: string;
        observacion: string;
    }[];
    metadataMain: {
        key: string;
        label: string;
        render?: (row: any) => any;
    }[];
    listStatus: {
        label: string;
        value: string;
    }[];
}

export const EntityContentInit: EntityContent = {
    listDocument: [],
    metadataDocument: [],
    listMain: [],
    metadataMain: [],
    listStatus: []
}