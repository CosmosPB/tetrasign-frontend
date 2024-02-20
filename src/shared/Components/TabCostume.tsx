import { useState } from 'react';
import './TabCostume.scss';

interface ContainerProps {
    options: { label: string; key: string }[];
    onChange: (key: string) => any;
    children: JSX.Element | JSX.Element[];
    defaultKey?: string;
}

export const TabCostume = (props: ContainerProps) => {
    const [key, setKey] = useState<string>(props.defaultKey || '');

    const onChange = (newKey: string) => {
        props.onChange(newKey);
        setKey(() => (newKey));
    }

    return (
        <div className="TabCostume">
            <div className="ContentOptions">
                {
                    props.options.map(row =>
                        <div key={row.key} className={`item ${key === row.key ? 'item-selected' : ''}`} onClick={() => onChange(row.key)}>
                            <span>{row.label}</span>
                        </div>    
                    )
                }
            </div>
            <div className="ContentChildren">
                { props.children }
            </div>
        </div>
    )
}