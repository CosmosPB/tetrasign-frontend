import { useEffect } from "react";
import { ViewMain } from "./Components/ViewMain";
import { Controller } from "./Infraestructure/Controller";

const View = () => {
    const controller = Controller();

    useEffect(() => {
        controller.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ViewMain
            content={controller.content}
        />
    )
}

export default View;