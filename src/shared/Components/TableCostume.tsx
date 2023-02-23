import { useState } from 'react';
import { InputCheckbox } from './InputCostume';
import './TableCostume.scss';

interface EntityTableCostume {
    metadata: {
        key: string;
        label: string;
        render?: (row: any) => any;
    }[];
    data: any[];
    optionsSelect?: {
        show: boolean;
        key: string;
    };
}

const TableCostume = (props: EntityTableCostume) => {
    const [selectRow, setSelectRow] = useState<string[]>([]);

    const customOnChange = (key: string) => {
        if (!props.optionsSelect) return;
        let listSelected: string[] = selectRow;

        if (key === 'all' && selectRow.length < props.data.length)
            listSelected = props.data.map(row => row[`${props.optionsSelect?.key}`]);
        
        if (key === 'all' && selectRow.length === props.data.length)
            listSelected = [];

        if (key !== 'all') {
            const findIndex = listSelected.findIndex(row => row === key);
            findIndex === -1 ? listSelected.push(key) : listSelected.splice(findIndex, 1);
        }
        setSelectRow(() => [...listSelected]);
    }

    return (
        <div className="TableCostume">
            <table>
                <thead>
                    <tr>
                        { props.optionsSelect ? 
                                <th align='center'>
                                    <InputCheckbox
                                        label=''
                                        name=''
                                        onChange={() => customOnChange('all')}
                                        value={selectRow.length === props.data.length}
                                    />
                                </th> 
                            : null 
                        }
                        { props.metadata.map(row => <th key={row.key} >{row.label}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((row, index) => 
                            <tr key={index}>
                                {
                                    props.optionsSelect ? 
                                        <td align='center'>
                                            <InputCheckbox
                                                label=''
                                                name=''
                                                onChange={() => customOnChange(`${row[`${props.optionsSelect?.key}`]}`)}
                                                value={selectRow.some((key) => key === `${row[`${props.optionsSelect?.key}`]}`)}
                                            />
                                        </td> 
                                    : null
                                }
                                { props.metadata.map(rowMetadata => <td key={`${index}-${rowMetadata.key}`}>{ rowMetadata.render ? rowMetadata.render(row) : (row[rowMetadata.key] || '') }</td>) }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableCostume;