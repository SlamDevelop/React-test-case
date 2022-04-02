import React from 'react';
import '../App.css';
import { FormInput } from './FormInput';


// A set of our fields with validation patterns and their errors
const INPUTS = [
    {
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        patterns: [
            {
                pattern: '^(?!\s*$).+',
                error: 'This field in required'
            },
            {
                pattern: '^[a-zA-Z]+$',
                error: 'Only letters allowed'
            }
        ]
    },
    {
        type: 'text',
        name: 'number',
        placeholder: 'Number',
        patterns: [
            {
                pattern: '^(?!\s*$).+',
                error: 'This field in required'
            },
            {
                pattern: '^[0-9]+$',
                error: 'Only numbers allowed'
            },
            {
                pattern: '^.{12}$',
                error: 'Should contain 12 characters'
            }
        ]
    },
];

export function Form() {
    const [values, setValues] = React.useState({
        name: '',
        number: ''
    });
    const [InputsRefs, setInputsRefs] = React.useState([]);

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    React.useEffect(() => {
        setInputsRefs((InputsRefs) =>
            Array(INPUTS.length)
                .fill()
                .map((_, i) => InputsRefs[i] || React.createRef()),
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let success = true;

        InputsRefs.forEach((ref, index) => {
            success = ref.current.checkValid(Object.values(values)[index]);
        });

        if(success) {
            const data = new FormData(e.target);
            console.log(Object.fromEntries(data.entries()))
        }
    };

    return (
        <form className='order' method='POST' onSubmit={handleSubmit}>
            {INPUTS.map((input, index) => (
                <FormInput ref={InputsRefs[index]} key={`formInput_${index}`} {...input} onChange={onChange} />
            ))}
            <button type='submit'>
                <span>ORDER</span>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </form>
    );
}