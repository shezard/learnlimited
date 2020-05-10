import React from 'react';

function SetIcon(props) {

    return (
        <i className={`ss ss-${props.set.toLowerCase()}`}></i>
    );
}

export default SetIcon;
