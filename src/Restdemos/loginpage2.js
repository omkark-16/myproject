import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import styles from './loginpage.module.css';

const LoginComponent = () => {
    const { darkMode } = useDarkMode();
    const movecursor = useRef(null);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") movecursor.current.focus();
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorUsername('');
        setErrorPassword('');

        let valid = true;
        if (username === '') {
            setErrorUsername('Username is required');
            valid = false;
        }

        if (password === '') {
            setErrorPassword('Password is required');
            valid = false;
        }

        if (!valid) return;

        setTimeout(() => {
            if (username === 'Omkar' && password === '1652') {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/home');
            } else {
                if (username !== 'Omkar') {
                    setErrorUsername('Invalid username');
                }
                if (password !== '1652') {
                    setErrorPassword('Incorrect password');
                }
            }
        }, 100);
    };

    return (
        <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
            <div className={styles.formWrapper}>
                <h1 className={styles.heading}>Login Form</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type='text'
                            placeholder='Username'
                            autoComplete="on"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            onKeyPress={handleKeyPress}
                        />
                        {errorUsername && <div className={styles.error}>{errorUsername}</div>}
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            ref={movecursor}
                        />
                        {errorPassword && <div className={styles.error}>{errorPassword}</div>}
                    </div>

                    <button type='submit' className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
