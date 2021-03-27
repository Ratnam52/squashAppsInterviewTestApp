import React, { useState, useEffect } from 'react';

import { placeHolder } from '../../assets';
import { ToastsStore } from '../../controls';
import { content } from '../../common';
import './imageUploaderControl.css';

function ImageUploaderControl(props) {

    const [picture, setPicture] = useState('');

    const imgClick = () => {
        document.getElementById('btn').click()
    }

    useEffect(() => {
        setPicture(props.value)
    });

    const imgUpload = (event) => {
        let image = event.target.files[0]
        if (image.type === 'image/png' || image.type === 'image/jpeg') {
            if (image.size <= 5242880) {
                let reader = new FileReader();
                reader.readAsDataURL(image)
                reader.onload = () => {
                    setPicture(reader.result);
                    props.changeImage(reader.result);
                }
            }
        } else {
            ToastsStore.warning(content.fileFormat)
        }
    }

    return (
        <div className="imageUploader" >
            <input
                id="btn"
                title={props.label}
                type={"file"}
                onChange={(e) => imgUpload(e)}
                accept={'image/png, image/jpeg'}
            />

            <div className="imageBar">
                <img src={picture !== '' ? picture : placeHolder} color={"#ffffff"} height={"80px"} width={"80px"} onClick={imgClick}></img>
            </div>

            <span className='labelClass'>
                <label>{props.label}</label>
            </span>
        </div>
    );
}

export default ImageUploaderControl;