import React from 'react';

export default function Video(props) {
    return (
        <>
            <video style={{ width: "87%"}} autoPlay muted="true" id={props.id} controls>
                <source 
                    src={
                        props.src
                    } 
                    type="video/mp4"
                >
                </source>
            </video >
        </>
    )
}
