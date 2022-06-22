import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import Cookies from 'js-cookie';
import DashboardPage from "../pages/dashboard/DashboardPage";
import Layout from "../layout/Layout";
import FormPage from "../pages/form/FormPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminDashboardPage from "../pages/admin/dashboard/AdminDashboardPage";

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
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Layout content={<DashboardPage/>}/>
                        </PrivateRoute>
                    }/>
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <Layout content={<AdminDashboardPage/>}/>
                        </PrivateRoute>
                    }/>
                    <Route path="/form" element={
                        <PrivateRoute>
                            <Layout content={<FormPage/>}/>
                        </PrivateRoute>
                    }/>
                    <Route path="/chats" element={
                        <PrivateRoute>
                            <Layout content={<h1>Ini chat</h1>}/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteIndex