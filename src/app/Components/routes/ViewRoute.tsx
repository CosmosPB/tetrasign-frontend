import { Route, Routes, BrowserRouter } from "react-router-dom";
import ViewMain from './../../../context/Main'; 

const ViewRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="" element={<ViewMain />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ViewRoute;