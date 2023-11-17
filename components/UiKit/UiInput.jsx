import React from 'react';

const UiInput = ({type,id,label,colorCode,specialClass}) => {
    return (
        <div>
            {
                type!=='checkbox' && <label htmlFor={id}>{label}</label>
            }
            <input type={type} id={id} className={`accent-orange-400 bg-red-500 ${specialClass}`}/>
            {
                type=='checkbox' && <label htmlFor={id} className='ml-4 '> {label}</label>
            }
        </div>
    );
};

export default UiInput;