import { Navigate, Outlet } from 'react-router-dom';

const LoginSignUpProtectedRoute = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
        return <Navigate to="/profile" />;
    }

    return <Outlet />;
}

export default LoginSignUpProtectedRoute;