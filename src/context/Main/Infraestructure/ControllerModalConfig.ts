import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AdapterService } from "../../../shared/Adapters/AdapterService";
import { EntityResponseConfiguration } from "../Domain/EntityResponse";
import * as Yup from 'yup';
import { ValidationSchemaConfigModal } from "./AdapterConfigData";
import { AdapterValidator } from "../../../shared/Adapters/AdapterValidator";
import { AdapterToast } from "../../../shared/Adapters/ToastMessage";
import { EntityRequestFormConfig } from "../Domain/EntityRequest";
import { EntityForm } from "../Domain/Utils";

export const ControllerModalConfig = () => {
    const [formConfigModal, setFormConfigigModal] = useState<boolean>(false);
    const adapterService = new AdapterService();

    const form = useFormik({
        initialValues: {
        } as EntityForm,
        onSubmit: () => {},
        validationSchema: new Yup.ObjectSchema({
            // id: Yup.string().required().nullable(),
            ...ValidationSchemaConfigModal()
        })
    })

    const getData = async () => {
        try {
            const result = await adapterService.getData<EntityResponseConfiguration[]>('/configuration', {}, true, null)
            if (!result[0]) return;
            const uniqueItem = await adapterService.getData<EntityResponseConfiguration>(`/configuration/${result[0].id}`, {}, true, null)

            if (uniqueItem) {
                form.setValues({
                    // general
                    id: uniqueItem.id,
                    party_identification: uniqueItem.party_identification,
                    party_name: uniqueItem.party_name,
                    registration_name: uniqueItem.registration_name,
                    address_type_code: uniqueItem.address_type_code,
                    city_subdivision_name: uniqueItem.city_subdivision_name,
                    city_name: uniqueItem.city_name,
                    country_subentity: uniqueItem.country_subentity,
                    country_subentity_code: uniqueItem.country_subentity_code,
                    district: uniqueItem.district,
                    address_line: uniqueItem.address_line,
                    identification_code: uniqueItem.identification_code,

                    // configuration_paths
                    certificate: uniqueItem.configuration_paths.certificate,
                    certificate_password: uniqueItem.configuration_paths.certificate_password,
                    input: uniqueItem.configuration_paths.input,
                    output: uniqueItem.configuration_paths.output,
                    despatch_advice_template: uniqueItem.configuration_paths.despatch_advice_template,

                    // configuration_sunat_authentication
                    grant_type: uniqueItem.configuration_sunat_authentication.grant_type,
                    scope: uniqueItem.configuration_sunat_authentication.scope,
                    client_id: uniqueItem.configuration_sunat_authentication.client_id,
                    client_secret: uniqueItem.configuration_sunat_authentication.client_secret,
                    username: uniqueItem.configuration_sunat_authentication.username,
                    password: uniqueItem.configuration_sunat_authentication.password,

                    // configuration_sunat_endpoints
                    despatch_advice_url: uniqueItem.configuration_sunat_endpoints.despatch_advice_url
                })
            }
        } catch(error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        }
    }

    // Functions Form Config Modal
    const onChangeFormConfigModal = async (value: boolean) => {
        if (value) await getData();
        setFormConfigigModal(() => value);
    }

    const onChange = (name: string, value: any) => {
        form.setFieldValue(name, value);
    }

    // Funciones Form
    const onSubmit = async () => {
        try { await form.submitForm(); } catch (error) { }
        try { AdapterValidator.validate(await form.validateForm()); } catch (error) { AdapterToast.message("error", (error as Error).message, { position: "bottom-right" }); return null; }

        try {
            const payload = formatRequestPayload(form.values);
            await (
                form.values.id ?
                adapterService.putData(`/configuration/${form.values.id}`, payload, true, null)
                :
                adapterService.postData('/configuration', payload, true, null)
            )

            onChangeFormConfigModal(false);
            AdapterToast.message("success", "¡Configuración actualizada!", { position: "top-right" });
        } catch(error) {
            AdapterToast.message("error", (error as Error).message, { position: "bottom-right" });
        }
    }

    const formatRequestPayload = (payload: EntityForm): EntityRequestFormConfig => {
        return ({
            id: payload.id || '',
            party_identification: payload.party_identification,
            party_name: payload.party_name,
            registration_name: payload.registration_name,
            address_type_code: payload.address_type_code,
            city_subdivision_name: payload.city_subdivision_name,
            city_name: payload.city_name,
            country_subentity: payload.country_subentity,
            country_subentity_code: payload.country_subentity_code,
            district: payload.district,
            address_line: payload.address_line,
            identification_code: payload.identification_code,
            configuration_sunat_authentication: {
              grant_type: payload.grant_type,
              scope: payload.scope,
              client_id: payload.client_id,
              client_secret: payload.client_secret,
              username: payload.username,
              password: payload.password
            },
            configuration_sunat_endpoints: {
              despatch_advice_url: payload.despatch_advice_url
            },
            configuration_paths: {
              certificate: payload.certificate,
              certificate_password: payload.certificate_password,
              input: payload.input,
              output: payload.output,
              despatch_advice_template: payload.despatch_advice_template
            }
        })
    }

    return ({
        form,
        onChange,
        onSubmit,

        // Functions Form Config Modal
        onChangeFormConfigModal,
        formConfigModal
    })
}