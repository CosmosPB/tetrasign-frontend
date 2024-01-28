import './ModalCostume.scss';

interface ContainerProps {
    title: string;
    children: JSX.Element | JSX.Element[];
    show: boolean;
    close: Function;
    submit: Function;
}

export const ModalCostume = (props: ContainerProps) => {
    if (!props.show) return null;

    return (
        <div className="ModalCostume">
            <div className='BackgroundModal' onClick={() => props.close()}/>
            <div className="Modal">
                <header>
                    <h1> { props.title } </h1>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => props.close()}>
                        <path d="M13.3 0.709971C12.91 0.319971 12.28 0.319971 11.89 0.709971L7.00003 5.58997L2.11003 0.699971C1.72003 0.309971 1.09003 0.309971 0.700032 0.699971C0.310032 1.08997 0.310032 1.71997 0.700032 2.10997L5.59003 6.99997L0.700032 11.89C0.310032 12.28 0.310032 12.91 0.700032 13.3C1.09003 13.69 1.72003 13.69 2.11003 13.3L7.00003 8.40997L11.89 13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.41003 6.99997L13.3 2.10997C13.68 1.72997 13.68 1.08997 13.3 0.709971Z" fill="#252728"/>
                    </svg>
                </header>
                <section>
                    { props.children }
                </section>
                <footer>
                    <button className='btn btn-secondary' onClick={() => props.close()}>Cancelar</button>
                    <button className='btn btn-primary' onClick={() => props.submit()}>Enviar</button>
                </footer>
            </div>
        </div>
    )
}