import React from 'react';

interface PanelPrincipalProps {
    meta: number;
    totalConsumido: number;
    onAgregarConsumo: (cantidad: number) => void;
    registroConsumo: { aguaTomada: number; meta: number }[]; // Esto ya es un arreglo
}

const PanelPrincipal: React.FC<PanelPrincipalProps> = ({ meta, totalConsumido, onAgregarConsumo, registroConsumo = [] }) => {
    const metaAlcanzada = totalConsumido >= meta;

    return (
        <div className="container">
            <h2>Panel Principal</h2>
            <div className="buttons-container">
                <button onClick={() => onAgregarConsumo(250)}>+250 ml</button>
                <button onClick={() => onAgregarConsumo(500)}>+500 ml</button>
            </div>
            <div className="status">
                <p>Total Consumido: {totalConsumido / 1000} litros</p>
                <p>Meta Diaria: {meta / 1000} litros</p>
                <p>
                    {metaAlcanzada
                        ? '¡Felicidades, alcanzaste tu meta!'
                        : 'Sigue adelante, aún no alcanzas tu meta.'}
                </p>
            </div>

            <h3>Registro de Consumo</h3>
            <table>
                <thead>
                    <tr>
                        <th>Agua Tomada (litros)</th>
                        <th>Meta (litros)</th>
                    </tr>
                </thead>
                <tbody>
                    {registroConsumo.length > 0 ? (
                        registroConsumo.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro.aguaTomada / 1000} L</td> {/* Convertir de ml a L */}
                                <td>{registro.meta / 1000} L</td> {/* Convertir de ml a L */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No hay registros de consumo aún.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="weather">
                <p>Clima y más información aquí...</p>
            </div>
        </div>
    );
};

export default PanelPrincipal;
