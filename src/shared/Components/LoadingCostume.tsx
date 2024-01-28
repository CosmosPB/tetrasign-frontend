import './LoadingCostume.scss';

interface ContainerProps {
    loading: boolean;
}

export const LoadingCostume = (props: ContainerProps) => {
    if (!props.loading) return null;

    return (
        <div className="LoadingCostume">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <label>Cargando...</label>
        </div>
    )
}