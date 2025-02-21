import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode'
export default function useAuth() {
    const token = useSelector(selectToken);
    if (token) {
        const decoded = jwtDecode(token);
        const { id, username, email } = decoded;
        return { id, username, email }
    }
    return { id: null, username: '', email: '' }
}