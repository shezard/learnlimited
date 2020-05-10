import React from 'react';

function Icon(props) {

    let colors = props.colors.split('');
    colors.sort();

    return (
        <>
            { colors.map((color, idx) => {
                return <i key={idx} className={`ms ms-${color}`}></i>;
            }) }
        </>
    );
}

export default Icon;
