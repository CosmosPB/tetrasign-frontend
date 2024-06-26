import { InputDate, InputSelect, InputText } from "../../../shared/Components/InputCostume";
import TableCostume from "../../../shared/Components/TableCostume";
import { EntityContent } from "../Domain/EntityContent";
import IconOption from './../../../assets/icons/icon-option.svg';
import IconDownload from './../../../assets/icons/icon-download.svg';
import IconMessage from './../../../assets/icons/icon-message.svg';
import IconUpload from './../../../assets/icons/icon-upload.svg';
import { RipplesCostume } from "../../../shared/Components/RipplesCostume";
import { ButtonCostumeFile } from "../../../shared/Components/ButtonCostumeFile";
import './ViewMain.scss';

interface ContainerProps {
    content: EntityContent;
    openModal: Function;

    onChangeFile: (value: Array<File>) => void;
    openFormConfigModal: Function;

    convertXMLSign: Function;
    onCheckCDRDocument: Function;
    onChangeCheckedList(value: string[]): any 
}

export const ViewMain = (props: ContainerProps) => {
    return (
        <div className="ViewMain">
            <section className="SectionLeft">
                <div className="GroupActions">
                    <RipplesCostume className="btn-primary-ripple">
                        <ButtonCostumeFile text="Escanear Carpeta" type="directory" className="btn btn-primary" onChange={props.onChangeFile} />
                    </RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple">
                        {/*<button className="btn btn-secondary">Cargar archivos</button>*/}
                        <ButtonCostumeFile text="Cargar archivos" type="group-file" className="btn btn-secondary" onChange={props.onChangeFile} />
                    </RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple btn-opc"><button className="btn btn-secondary btn-opc" onClick={() => props.openFormConfigModal()}> <img src={IconOption} alt="icon-option" /> </button></RipplesCostume>
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
                    <button
                        onClick={() => props.convertXMLSign()}
                        disabled={props.content.listDocument.length === 0}
                        className="btn btn-third"
                    >
                        Convertir a XML Y Firmar
                    </button>
                </RipplesCostume>
                </div>
            </section>
            <section className="SectionRight">
                <div className="GroupActions">
                    <RipplesCostume className="btn-secondary-ripple"><button disabled className="btn btn-secondary">Enviar correo <img src={IconMessage} alt="icon-message" /></button></RipplesCostume>
                    <RipplesCostume className="btn-secondary-ripple"><button className="btn btn-secondary" onClick={() => props.onCheckCDRDocument()}>Descargar CDR <img src={IconDownload} alt="icon-download" /></button></RipplesCostume>
                    <RipplesCostume className="btn-primary-ripple"><button className="btn btn-primary" onClick={() => props.openModal()}>Envíar a sunat <img src={IconUpload} alt="icon-upload" /></button></RipplesCostume>
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
                        onSelectRow={props.onChangeCheckedList}
                    />
                </div>
            </section>
        </div>
    )
}