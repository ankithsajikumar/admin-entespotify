import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedLayout = () => {
	const token = localStorage.getItem("token")
	const location = useLocation()

	if (!token) {
		return <Navigate to="/login" state={{ path: location.pathname }} />;
	} else {

		return (
			<Outlet />
		)
	}
}