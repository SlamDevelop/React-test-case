import React from 'react';
import '../App.css';
import { ModalContext } from '../App';
import { CardsItem } from './CardsItem';


const API_URL = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';

export function Cards() {
    const [data, setData] = React.useState([]);
    const [MODAL, setModal] = React.useContext(ModalContext);
    
    React.useEffect(() => {
        const fetchData = async () => {
            // get the data from the api
            const res = await fetch(API_URL);
            // convert the res to json
            const json = await res.json();

            // set state with the result
            // leave 6 elements from the array (as in the template)
            setData(json.slice(0, 6));
        }

        fetchData()
            .catch(console.error);
    }, []);

    const clickBuy = () => {
        setModal({
            visible: true,
            item: data.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
        });
    };
      
    return (
        <>
            <div className='product-list'>
                {data.map((item, index) => (
                    <CardsItem key={`prodItem_${index}`} item={item} />
                ))}
            </div>
            <div className='cheapest'>
                <button type='button' onClick={clickBuy}>
                    <span>Buy cheapest</span>
                </button>
            </div>
        </>
    );
}