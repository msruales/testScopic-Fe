import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages";
import RegisterPage from "../pages/Register/RegisterPage";
import {useSelector} from "react-redux";
import {isLoadingInit} from "../redux/slices/authSlice";
import {PrivateRoute, PublicRoute, DashboardRoutes} from "./";
import '../App.css';

const AppRouter = () => {

    const loadingInit = useSelector(isLoadingInit)

    if (loadingInit) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes/>
                    </PrivateRoute>
                }/>
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage/>
                    </PublicRoute>
                }/>
                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterPage/>
                    </PublicRoute>
                }/>

            </Routes>
        </div>
    )
}
export default AppRouter