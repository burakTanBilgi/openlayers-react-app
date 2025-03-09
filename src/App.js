// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
    const [backendStatus, setBackendStatus] = useState('Checking...');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/health') // Make sure URL matches backend server
            .then((response) => response.json())
            .then((data) => setBackendStatus(data.status))
            .catch(error => setBackendStatus('Error'));
    }, []);

    return (
        <div className="App">
            <h1>Backend Status: {backendStatus}</h1>
            <MapComponent />
        </div>
    );
}

export default App;
