import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfiguracionUsuario: React.FC<{ onGuardarMeta: (meta: number) => void }> = ({ onGuardarMeta }) => {
    const [meta, setMeta] = useState<number>(0);
    const navigate = useNavigate();

    const manejarSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (meta > 0) {
            const metaMililitros = meta * 1000; // Convertir litros a mililitros
            onGuardarMeta(metaMililitros);
            navigate('/panel'); // Redirigir al panel principal
        }
    };

    return (
        <div>
            <h2>Establecer Meta Diaria de Agua</h2>
            <form onSubmit={manejarSubmit}>
                <label>
                    Meta diaria (litros):
                    <input
                        type="number"
                        value={meta}
                        onChange={(e) => setMeta(Number(e.target.value))}
                        required
                        min="1"
                    />
                </label>
                <button type="submit">Guardar y Continuar</button>
            </form>
        </div>
    );
};

export default ConfiguracionUsuario;
