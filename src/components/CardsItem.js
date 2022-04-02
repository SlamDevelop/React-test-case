import React from 'react';
import '../App.css';
import { ModalContext } from '../App';


export function CardsItem({ item }) {
    const [MODAL, setModal] = React.useContext(ModalContext);

    const clickBuy = (item) => {
        setModal({
            visible: true,
            item
        });
    };

    return (
        <div className='product-item product-info' onClick={() => clickBuy(item)}>
            <div className='product-cat'>
                <span>{item.category}</span>
            </div>
            <div className='product-name'>
                <span>{item.name}</span>
            </div>

            <div className='product-sell'>
                <div className='product-price'>
                    <span className='currency'>$</span>
                    <span>{item.price}</span>
                </div>
                <button type='button' className='product-btn'>
                    <span>BUY</span>
                </button>
            </div>
        </div>
    );
}