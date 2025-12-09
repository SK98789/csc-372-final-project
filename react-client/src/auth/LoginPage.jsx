import { useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || 'http://localhost:3000';
    const googleLoginUrl = BACKEND_URL + '/auth/google?returnTo=' + from;


    return (
        <>
            <h1>Log In or Create Account</h1>
            <h2>Please sign in using a Google account</h2>
            <a href={googleLoginUrl}><button
            >Log in Here</button></a>
        </>
    );
}
export default Login;