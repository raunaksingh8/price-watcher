import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, onLogout }) {

    const navigate = useNavigate();

    const logout = () => {
        onLogout();
        navigate("/", { replace: true });
    };

    return (
        <div>

            <h1>Welcome {user?.name.split(" ")[0]} 👋</h1>

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}
