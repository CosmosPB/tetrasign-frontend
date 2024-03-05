export type EntityRequestFormConfig = {
  id: string
  party_identification: string
  party_name: string
  registration_name: string
  address_type_code: string
  city_subdivision_name: string
  city_name: string
  country_subentity: string
  country_subentity_code: string
  district: string
  address_line: string
  identification_code: string
  configuration_sunat_authentication: {
    grant_type: string
    scope: string
    client_id: string
    client_secret: string
    username: string
    password: string
  }
  configuration_sunat_endpoints: {
    despatch_advice_url: string
  }
  configuration_paths: {
    certificate: string
    certificate_password: string
    input: string
    output: string
    despatch_advice_template: string
  }
}