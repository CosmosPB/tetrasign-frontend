export interface EntityDocument {
    key: string;
    type: string;
    nroDocumento: string;
    file: File;
}

export interface EntityConfigModal {
    show: boolean;
    title: string;
}

export const EntityConfigModalInit: EntityConfigModal = {
    show: false,
    title: "Enviar a sunat"
}