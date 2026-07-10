import { Navigate } from "react-router-dom";

export default function PublicRoute({ children, isAuthenticated }) {
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
