import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import './App.scss';

function App() {
    const [ file, setFile ] = useState(null);
    const [ array, setArray ] = useState(null);

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        setArray(JSON.stringify([...new Uint8Array(reader.result)]));
    }, false);

    useEffect(() => {
        if (file) {
            reader.readAsArrayBuffer(file);
        }
    }, [ file, reader ]);

    const onDrop = acceptedFiles => setFile(acceptedFiles[0]);

    return (
        <div className="app">
            <header>
                <h1>bin2array</h1>
            </header>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} accept="*" />
                        <p>Drag and drop a binary file here</p>
                        <p className="dropzone__or">
                            <span>or</span>
                        </p>
                        <p>click on this area to open a file selection dialog.</p>
                    </div>
                </section>
                )}
            </Dropzone>
            <section className="output">
                <h2>Output:</h2>
                { array }
            </section>
        </div>
    );
}

export default App;
