import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
console.log(username, password)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setError('Los campos no pueden estar vacíos.');
            return;
        }

        try {
            const response = await fetch('https://backend-beryl-sigma.vercel.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: username, contrasena: password }),
            });

            if (response.ok) {
                const data = await response.json();
                setError('');
                onLogin(data.token);
            } else {
                const data = await response.json();
                setError(data.error || 'Usuario o contraseña incorrectos.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}

export default LoginForm;






