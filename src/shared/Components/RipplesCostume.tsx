import Ripples from 'react-ripples';
import './RipplesCostume.scss'

interface ContainerProps {
    children: JSX.Element | JSX.Element[];
    className: string;
}

export const RipplesCostume = (props: ContainerProps) => {

    return (
        <Ripples className={`RipplesCostume ${props.className}`}>
            {props.children}
        </Ripples>
    )
};