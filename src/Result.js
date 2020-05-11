import React from 'react';
import ColorIcon from './ColorIcon';
import SetIcon from './SetIcon';

function Result(props) {

    return (
        <div className="result">
            <h2>
                <SetIcon set={props.result.set} /> {props.result.set} - {props.result.player} - <ColorIcon colors={props.result.colors} />
            </h2>
            <div className="links">
                <a href={`http://youtu.be/${props.result.video_id}?t=${props.result.timestamp_draft}`}>Draft start</a>
                {
                    props.result.timestamp_match &&
                        <>
                            <span> - </span>
                            <a href={`http://youtu.be/${props.result.video_id}?t=${props.result.timestamp_match}`}>Match start</a>
                        </>
                }
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
