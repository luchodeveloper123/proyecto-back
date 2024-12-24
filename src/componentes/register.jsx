import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerpage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setError('Los campos no pueden estar vacíos.');
            return;
        }

        if (username.length < 6 || password.length < 6) {
            setError('El nombre de usuario y la contraseña deben tener al menos 6 caracteres.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: username, contrasena: password }),
            });

            if (response.ok) {
                alert('Usuario registrado con éxito.');
                navigate('/authpage');
            } else {
                const data = await response.json();
                setError(data.error || 'Error al registrar usuario.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="register-page-container">
            <form className="register-page-form" onSubmit={handleRegister}>
                <div className="register-page-input-group">
                    <label htmlFor="register-username">Usuario</label>
                    <input
                        type="text"
                        id="register-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-page-input"
                    />
                </div>
                <div className="register-page-input-group">
                    <label htmlFor="register-password">Contraseña</label>
                    <input
                        type="password"
                        id="register-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-page-input"
                    />
                </div>
                {error && <p className="register-page-error">{error}</p>}
                <button type="submit" className="register-page-button">Crear Cuenta</button>
            </form>
        </div>
    );
};

export default RegisterPage;





