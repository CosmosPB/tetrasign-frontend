import axios, { AxiosRequestConfig } from "axios";
import { AdapterLocalstorage } from "./AdapterLocalstorage";

export class AdapterService {
    private token: string;
    private urlBase: string;
    constructor() {
        this.token = new AdapterLocalstorage().get<string>('token');
        this.urlBase = `${process.env.REACT_APP_URL_SERVICE}`;
    }

    public async getData<T>(url: string, payload: object | null, auth: boolean = false, extraConfig: object | null): Promise<T> {
        const config: AxiosRequestConfig<any> = {};
        if (auth) Object.assign(config, { auth: this.token });
        if (payload) Object.assign(config, { payload });
        if (extraConfig) Object.assign(config, { ...config, ...extraConfig });
        return (await axios.get(`${this.urlBase}${url}`, config)).data;
    }

    public async postData<T>(url: string, payload: object | null, auth: boolean = false, extraConfig: object | null): Promise<T> {
        const config: AxiosRequestConfig<any> = {};
        if (auth) Object.assign(config, { auth: this.token });
        if (extraConfig) Object.assign(config, { ...config, ...extraConfig });
        return (await axios.post(`${this.urlBase}${url}`, payload, config)).data;
    }

    public async putData<T>(url: string, payload: object | null, auth: boolean = false, extraConfig: object | null): Promise<T> {
        const config: AxiosRequestConfig<any> = {};
        if (auth) Object.assign(config, { auth: this.token });
        if (extraConfig) Object.assign(config, { ...config, ...extraConfig });
        return (await axios.put(`${this.urlBase}${url}`, payload, config)).data;
    }

    public async deleteData<T>(url: string, auth: boolean = false, extraConfig: object | null): Promise<T> {
        const config: AxiosRequestConfig<any> = {};
        if (auth) Object.assign(config, { auth: this.token });
        if (extraConfig) Object.assign(config, { ...config, ...extraConfig });
        return (await axios.delete(`${this.urlBase}${url}`, config)).data;
    }
}