import Ripples from 'react-ripples';

interface ContainerProps {
    children: JSX.Element | JSX.Element[];
}

export const RipplesCostume = (props: ContainerProps) => {

    return (
        <Ripples>
            {props.children}
        </Ripples>
    )
};