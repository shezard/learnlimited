import React from 'react';
import Icon from './Icon';

function Result(props) {

    return (
        <div className="result">
            <h2>
                {props.result.player} - {props.result.set} - <Icon colors={props.result.colors} />
            </h2>
            <div className="links">
                <a href={`http://youtu.be/${props.result.video_id}?t=${props.result.timestamp_draft}`}>Draft start</a>
                <span> - </span>
                <a href={`http://youtu.be/${props.result.video_id}?t=${props.result.timestamp_match}`}>Match start</a>
            </div>
            <div className="video">
                <i className="spinner fa fa-spinner-notch fa-spin"></i>
                    <iframe
                        src={`http://www.youtube.com/embed/${props.result.video_id}?start=${props.result.timestamp_draft}`}
                        width="720"
                        height="360"
                        title="View draft"
                    ></iframe>
                </div>
            </div>
    );
}

export default Result;
