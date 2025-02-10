import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './authpage.css';

const AuthPage = () => {
    const [authUsername, setAuthUsername] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authUsername.trim().length < 3 || authPassword.trim().length < 6) {
            setAuthError('Usuario o contraseña inválidos.');
            return;
        }

        try {
            const response = await fetch('https://backend-beryl-sigma.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario: authUsername, contrasena: authPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                setAuthError(data.error || 'Error al iniciar sesión.');
                return;
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            setAuthError('');
            navigate('/listachats');
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setAuthError('Hubo un problema al conectarse con el servidor.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/register');
    };

    return (
        <div className="auth-page-container">
            <form className="auth-page-form" onSubmit={handleSubmit}>
                <div className="auth-page-input-group">
                    <label htmlFor="auth-page-username">Usuario</label>
                    <input 
                        type="text" 
                        id="auth-page-username" 
                        value={authUsername} 
                        onChange={(e) => setAuthUsername(e.target.value)} 
                        className="auth-page-input"
                    />
                </div>
                <div className="auth-page-input-group">
                    <label htmlFor="auth-page-password">Contraseña</label>
                    <input 
                        type="password" 
                        id="auth-page-password" 
                        value={authPassword} 
                        onChange={(e) => setAuthPassword(e.target.value)} 
                        className="auth-page-input"
                    />
                </div>
                {authError && <p className="auth-page-error">{authError}</p>}
                <button type="submit" className="auth-page-button">Iniciar Sesión</button>
                <button 
                    type="button" 
                    onClick={handleCreateAccount} 
                    className="auth-page-button auth-page-create-button"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
};

export default AuthPage;






