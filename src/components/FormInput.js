import React from 'react';
import '../App.css';


export const FormInput = React.forwardRef((props, ref) => {
    const { patterns, onChange, ...InputProp } = props;
    const [state, setState] = React.useState({
        type: '',
        message: ''
    });

    React.useImperativeHandle(ref, () => ({
        checkValid(value) {
            return validation(value);
        }
    }));

    const onFocus = () => {
        if(state.type === 'error') {
            setState({type: '', message: ''});
        }
    };

    const validation = (value) => {
        let valid = patterns.some(p => {
            var regEx = new RegExp(p.pattern, 'gi');
            if(!regEx.exec(value)) {
                setState({
                    type: 'error',
                    message: p.error
                });
                return true;
            }
            else {
                setState({
                    type: 'success',
                    message: ''
                });
            }
            return false;
        });

        return !valid;
    };

    return (
        <div className={`field-wrap ${state.type}`}>
            <div className='field'>
                <i className="fa-solid fa-circle-xmark"></i>
                <input {...InputProp} onFocus={onFocus} onBlur={(e) => { validation(e.target.value) }} onChange={onChange} />
            </div>
            {state.message.length > 0 && 
                <label>{state.message}</label>
            }
        </div>
    );
});