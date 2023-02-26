import { InputDate, InputSelect, InputText } from "../../../shared/Components/InputCostume";
import TableCostume from "../../../shared/Components/TableCostume";
import { EntityContent } from "../Domain/EntityContent";
import IconOption from './../../../assets/icons/icon-option.svg';
import IconDownload from './../../../assets/icons/icon-download.svg';
import IconMessage from './../../../assets/icons/icon-message.svg';
import IconUpload from './../../../assets/icons/icon-upload.svg';
import './ViewMain.scss';
import { RipplesCostume } from "../../../shared/Components/RipplesCostume";

interface ContainerProps {
    content: EntityContent;
}

export const ViewMain = (props: ContainerProps) => {
    return (
        <div className="ViewMain">
            <section className="SectionLeft">
                <div className="GroupActions">
                    <RipplesCostume className="btn-primary-ripple"><button className="btn btn-primary">Escanear Carpeta</button></RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple"><button className="btn btn-secondary">Cargar archivos</button></RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple btn-opc"><button className="btn btn-secondary btn-opc"> <img src={IconOption} alt="icon-option" /> </button></RipplesCostume>
                </div>
                <div className="DocumentsLoaded">
                    <span>Documentos cargados:</span>
                    <TableCostume
                        data={props.content.listDocument}
                        metadata={props.content.metadataDocument}
                    />
                </div>
                <div className="GroupButtonFinal">
                <RipplesCostume className="btn-third-ripple">
                    <button className="btn btn-third">Convertir a XML Y Firmar</button>
                </RipplesCostume>
                </div>
            </section>
            <section className="SectionRight">
                <div className="GroupActions">
                    <RipplesCostume className="btn-secondary-ripple"><button className="btn btn-secondary">Enviar correo <img src={IconMessage} alt="icon-message" /></button></RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple"><button className="btn btn-secondary">Descargar CDR <img src={IconDownload} alt="icon-download" /></button></RipplesCostume>
                    <RipplesCostume className="btn-primary-ripple"><button className="btn btn-primary">Envíar a sunat <img src={IconUpload} alt="icon-upload" /></button></RipplesCostume>
                </div>
                <div className="GroupFilters">
                    <InputText
                        style={{ flex: 1 }}
                        label="Buscar"
                        name="textSearch"
                        onChange={() => {}}
                        value=""
                    />
                    <InputSelect
                        label="Tipo de documento"
                        name="documentoSearch"
                        onChange={() => {}}
                        value=""
                        options={[{ label: 'test 1', value: 'test1' }, { label: 'test 2', value: 'test2' }]}
                    />
                    <InputSelect
                        label="Estado"
                        name="statusSearch"
                        onChange={() => {}}
                        value=""
                        options={props.content.listStatus}
                    />
                    <span>desde</span>
                    <InputDate
                        label=""
                        name="dateInitSearch"
                        onChange={() => {}}
                        value=""
                    />
                    <span>hasta</span>
                    <InputDate
                        label=""
                        name="dateEndSearch"
                        onChange={() => {}}
                        value=""
                    />
                </div>
                <div>
                    <TableCostume
                        data={props.content.listMain}
                        metadata={props.content.metadataMain}
                        optionsSelect={{
                            key: 'key',
                            show: true
                        }}
                    />
                </div>
            </section>
        </div>
    )
}