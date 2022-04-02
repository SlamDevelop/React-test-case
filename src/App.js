import React from 'react';
import './App.css';
import { Cards } from './components/Cards';
import { Modal } from './components/Modal';

export const ModalContext = React.createContext();

function App() {
    const [MODAL, setModal] = React.useState({
		visible: false,
        item: {}
	});

    return (
        <div className="App">
            <ModalContext.Provider value={[MODAL, setModal]}>
                <Cards />
                <Modal />
            </ModalContext.Provider>
            
        </div>
    );
}

export default App;