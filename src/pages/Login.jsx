import styles from "./Login.module.css";
import { useEffect, useState } from 'react';
import PageNav from '../components/PageNav.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) {
            login(email, password);
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/app', { replace: true });
        }
    }, [isAuth, navigate]);

    return (
        <main className={styles.login}>
            <PageNav/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
}
