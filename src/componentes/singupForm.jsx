import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './singupform.css';

function SignupPage() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!newUsername || !newPassword) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (newUsername.length < 6 || newPassword.length < 6) {
            setError('El nombre de usuario y la contraseña deben tener al menos 6 caracteres.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: newUsername, contrasena: newPassword }),
            });

            if (response.ok) {
                alert('Usuario registrado con éxito.');
                navigate('/login'); 
            } else {
                const data = await response.json();
                setError(data.error || 'Error al registrar usuario.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="signup-page-container">
            <h2 className="signup-page-title">Crear Cuenta</h2>
            <input
                type="text"
                placeholder="Nombre de Usuario"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="signup-page-input"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="signup-page-input"
            />
            <button onClick={handleSignup} className="signup-page-button">Registrarse</button>
            {error && <p className="signup-page-error">{error}</p>}
        </div>
    );
}

export default SignupPage;



