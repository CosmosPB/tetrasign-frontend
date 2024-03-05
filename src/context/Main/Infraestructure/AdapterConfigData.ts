import * as Yup from 'yup'

export const AdapterConfigModal = {
    options: [
        { key: "generico", label: 'Configuración general' },
        { key: "ruta", label: 'Configuración ruta' },
        { key: "sunat", label: 'Configuración Sunat' },
        { key: "endpoint", label: 'Configuración endpoint' }
    ],
    defaultKey: 'generico',
    Form: {
        generico: [
            { type: 'text', required: true, label: 'Party Identification', key: 'party_identification' },
            { type: 'text', required: true, label: 'Party Name', key: 'party_name' },
            { type: 'text', required: true, label: 'Registration Name', key: 'registration_name' },
            { type: 'text', required: true, label: 'Address Type Code', key: 'address_type_code' },
            { type: 'text', required: true, label: 'City Subdivision Name', key: 'city_subdivision_name' },
            { type: 'text', required: true, label: 'City Name', key: 'city_name' },
            { type: 'text', required: true, label: 'Country', key: 'country_subentity' },
            { type: 'text', required: true, label: 'Country Subentity Code', key: 'country_subentity_code' },
            { type: 'text', required: true, label: 'District', key: 'district' },
            { type: 'text', required: true, label: 'Address Line', key: 'address_line' },
            { type: 'text', required: true, label: 'Identification Code', key: 'identification_code' },
        ],
        ruta: [
            { type: 'text', required: true, label: 'Certificate', key: 'certificate' },
            { type: 'text', required: true, label: 'Certificate Password', key: 'certificate_password' },
            { type: 'text', required: true, label: 'Input', key: 'input' },
            { type: 'text', required: true, label: 'Output', key: 'output' },
            { type: 'text', required: true, label: 'Despatch Advice Template', key: 'despatch_advice_template' },
        ],
        sunat: [
            { type: 'text', required: true, label: 'Grant type', key: 'grant_type' },
            { type: 'text', required: true, label: 'Scope', key: 'scope' },
            { type: 'text', required: true, label: 'Client ID', key: 'client_id' },
            { type: 'text', required: true, label: 'Client Secret', key: 'client_secret' },
            { type: 'text', required: true, label: 'Username', key: 'username' },
            { type: 'text', required: true, label: 'Password', key: 'password' },
        ],
        endpoint: [
            { type: 'text', required: true, label: 'Despatch Advice URL', key: 'despatch_advice_url' }
        ]
    } as any
}


export const ValidationSchemaConfigModal = () => {
    const arrInputs = [...AdapterConfigModal.Form.generico, ...AdapterConfigModal.Form.ruta, ...AdapterConfigModal.Form.sunat, ...AdapterConfigModal.Form.endpoint];
    return arrInputs.reduce((prev, current) => {
        if (current.type === 'text' && current.required)
            Object.assign(prev, { [current.key]: Yup.string().required(`${current.label} es requerido`).nullable() })

        return prev;
    }, {} as any);
}