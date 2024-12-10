import React, { useState, useEffect } from 'react';
import ConfiguracionUsuario from './components/configModule/configuracionUsuario.tsx';
import PanelPrincipal from './components/principalModule/panelPrincipal.tsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import './components/configModule/configuracionUsuario.css';
import './components/principalModule/panelPrincipal.css';

const App: React.FC = () => {
    const [meta, setMeta] = useState<number | null>(null);
    const [totalConsumido, setTotalConsumido] = useState<number>(0);
    const [consumos, setConsumos] = useState<{ cantidad: number; meta: number }[]>([]);

    useEffect(() => {
        // Cargar meta y consumo desde LocalStorage
        const metaGuardada = localStorage.getItem('metaDiaria');
        const totalConsumidoGuardado = localStorage.getItem('totalConsumido');

        if (metaGuardada) {
            setMeta(Number(metaGuardada)); // En mililitros
        }

        if (totalConsumidoGuardado) {
            setTotalConsumido(Number(totalConsumidoGuardado)); // En mililitros
        }
    }, []);

    const actualizarMeta = (metaDiaria: number) => {
        setMeta(metaDiaria);
        localStorage.setItem('metaDiaria', JSON.stringify(metaDiaria));
    };

    const agregarConsumo = (cantidad: number) => {
        const nuevoTotal = totalConsumido + cantidad;
        setTotalConsumido(nuevoTotal);
        localStorage.setItem('totalConsumido', JSON.stringify(nuevoTotal));

        // Actualizar la lista de consumos, eliminando la hora si no la usas
        setConsumos((prevConsumos) => [
            ...prevConsumos,
            { cantidad, meta: meta ?? 0 }
        ]);
    };

    const reiniciarDatos = () => {
        setMeta(null);
        setTotalConsumido(0);
        setConsumos([]);
        localStorage.removeItem('metaDiaria');
        localStorage.removeItem('totalConsumido');
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={<ConfiguracionUsuario onGuardarMeta={actualizarMeta} />}
                    />
                    <Route
                        path="/panel"
                        element={
                            <PanelPrincipal
                                meta={meta ?? 0} // Asegúrate de que siempre se pase un número
                                totalConsumido={totalConsumido}
                                onAgregarConsumo={agregarConsumo}
                                consumos={consumos} // Asegúrate de que siempre sea un arreglo
                            />
                        }
                    />
                </Routes>

                {/* Solo mostramos el botón de Volver al Inicio si meta está definida */}
                {meta !== null && (
                    <div>
                        <Link to="/">
                            <button>Volver al Inicio</button>
                        </Link>
                        <button className="reiniciar" onClick={reiniciarDatos}>
                            Reiniciar
                        </button>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
