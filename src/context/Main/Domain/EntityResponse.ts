export interface EntityResponseConfiguration {
    id: string;
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
    configuration_sunat_authentication: {
        grant_type: string;
        scope: string;
        client_id: string;
        client_secret: string;
        username: string;
        password: string;
    },
    configuration_sunat_endpoints: {
        despatch_advice_url: string;
    },
    configuration_paths: {
        certificate: string;
        certificate_password: string;
        input: string;
        output: string;
        despatch_advice_template: string;
    }
}

export type EntityResponseListDespatchService = {
    id: string
    document_id: string
    document_type: string
    issue_date: string
    upload_date: string
    sign_date: string
    send_date: any
    data: {
      document_number: string
      identification_document_number: string
      identification_document_type: string
      business_name: string
      transfer_reason_code: string
      transfer_reason_description: string
      total_gross_weight: string
      measurement_unit: string
      quantity_packages: string
      transportation_mode: string
      transportation_start_date: string
      carriers_plate_number: string
      carriers_document_number: string
      carriers_document_type: string
      carrier_name: string
      carriers_licence_number: string
      destination_ubigeo: string
      destination_address: string
      departure_ubigeo: string
      departure_address: string
      despatch_advice_lines: Array<{
        measurement_unit: string
        quantity: string
        description: string
        code: string
      }>
      observation: any
      issue_date: string
      issue_hours: string
      document_type: number
      ubl_version_id: string
      customization_id: string
    }
    filename: string
    extension: string
    state: string
    observation: any
    ticket_id: any
}
  