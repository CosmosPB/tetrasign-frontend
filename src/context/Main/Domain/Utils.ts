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

export interface EntityForm {
    id: string | null;
    party_identification: string;
    party_name: string;
    registration_name: string;
    address_type_code: string;
    city_subdivision_name: string;
    city_name: string;
    country_subentity: string;
    country_subentity_code: string;
    district: string;
    address_line: string;
    identification_code: string;
    certificate: string;
    certificate_password: string;
    input: string;
    output: string;
    despatch_advice_template: string;
    grant_type: string;
    scope: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    despatch_advice_url: string;
}