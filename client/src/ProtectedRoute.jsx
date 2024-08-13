import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

const ProtectedRoute = ( ) => {
    const {loading, isAuthenticated} = useAuth();

    if (!loading && !isAuthenticated) return <Navigate to="/InicioSesion" />

    return <Outlet/>;
}

export default ProtectedRoute