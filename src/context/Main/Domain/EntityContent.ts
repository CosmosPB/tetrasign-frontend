import { EntityDocument, EntityItemDocument } from "./Utils"

export interface EntityContent {
    listDocument: EntityDocument[];
    metadataDocument: {
        key: string;
        label: string;
        render?: (row: any, position: number) => any;
    }[];
    listMain: EntityItemDocument[];
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