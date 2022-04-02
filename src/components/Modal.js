import React from 'react';
import '../App.css';
import { ModalContext } from '../App';
import { Form } from './Form';

export function Modal() {
    const [MODAL, setModal] = React.useContext(ModalContext);

    const onClose = () => {
        setModal({
            ...MODAL,
            visible: false
        });
    };

    // сreate an Esc key handler
    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    // listening to button presses
    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    });

    // if a component is invisible, we do not display it
    if (!MODAL.visible) 
        return null

    // or return the modal window layout
    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-window' onClick={e => e.stopPropagation()}>
                <div className='modal-close' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </div>

                <div className='product-info'>
                    <div className='product-cat'>
                        <span>{MODAL.item.category}</span>
                    </div>
                    <div className='product-name'>
                        <span>{MODAL.item.name}</span>
                    </div>
                    <div className='product-price'>
                        <span className='currency'>$</span>
                        <span>{MODAL.item.price}</span>
                    </div>
                </div>

                <Form />
            </div>
        </div>
    )
}