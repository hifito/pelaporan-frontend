import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import Cookies from 'js-cookie';

const RouteIndex = () => {
    function useAuth() {
        return Cookies.get('token') === undefined;
    }

    const PrivateRoute = ({children}) => {
        const auth = useAuth()
        return auth ? <Navigate to="/login"/> : children
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/login" element={<LoginPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteIndex