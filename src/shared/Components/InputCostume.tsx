import './InputCostume.scss';

interface InputBase {
    onChange(name: string, value: any): any;
    name: string;
    value: any;
    label: string;
    className?: string;
    style?: React.CSSProperties;
}

export const InputText = (props: InputBase) => {
    return (
        <input
            style={props.style || {}}
            type="text"
            className={`InputText ${props.className || ''}`}
            placeholder={props.label}
            name={props.name}
            onChange={(evt) => props.onChange(evt.target.name, evt.target.value)}
        />
    )
}

interface InputSelectProps extends InputBase {
    options: { label: string; value: string; }[];
}

export const InputSelect = (props: InputSelectProps) => {
    return (
        <select
            style={props.style || {}}
            className={`InputSelect ${props.className || ''}`}
            placeholder={props.label}
            name={props.name}
            onChange={(evt) => props.onChange(evt.target.name, evt.target.value)}
        >
            {
                props.options.map(row => <option key={row.value} value={row.value} > {row.label} </option>)
            }
        </select>
    )
}

export const InputDate = (props: InputBase) => {
    return (
        <input
            style={props.style || {}}
            type="date"
            className={`InputDate ${props.className || ''}`}
            placeholder={props.label}
            name={props.name}
            onChange={(evt) => props.onChange(evt.target.name, evt.target.value)}
        />
    )
}

export const InputCheckbox = (props: InputBase) => {
    return (
        <label className={`InputCheckbox ${props.className || ''}`}>
            <input
                style={props.style || {}}
                type="checkbox"
                placeholder={props.label}
                checked={props.value}
                name={props.name}
                onChange={(evt) => props.onChange(evt.target.name, evt.target.value)}
            />
            <span className="checkmark"></span>
        </label>
    )
}