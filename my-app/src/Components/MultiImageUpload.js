import React, { useState, useEffect } from 'react';

function MultiImageUpload(props){
    /* set the file to 'null' initially */
    const [imagesPreview, setImagePreview] = useState([]);
    const [images, setImage] = useState([]);
    
    /* function to set the file upon changing on the page */
    const onImageChange = (event, otherFunc) => {
        if(event.target.files && event.target.files[0])
        {
            setImagePreview(imgURLs => [...imgURLs, URL.createObjectURL(event.target.files[0]) ] );
            
            setImage(imgs => [...imgs, event.target.files[0]]);
            
            // this is meant to update the value on the page that calls this component
            otherFunc(event.target.files[0]);
            
            console.log("image is:\n", images);
            
            console.log("event.target.files[0] is: ", event.target.files[0]);
            console.log("event.target.files is: ", event.target.files);
            //console.log("image is: ", image);
        }
    };
    
    /* function to remove an image */
    
    useEffect(()=>{}, [images])
    
    
    return(
        <div>
            {/* the 'name' attribute here is the same as that in the 'formdata.append' function, which is very important */}
            {/* <input type='file' name='user_img' onChange={onImageChange} /> */}
            
            <input type='file' name='user_img' onChange={
                (event) => {
                    onImageChange(event, props.imageChange);
                    }
                } />
            <br/>
            {/* this is for the preview. not necessary in the uploading process, but still
                a good feature to have. */}
            {imagesPreview && imagesPreview.map && (imagesPreview.length > 0) ? 
                <div className='row'>
                {imagesPreview.map((imagePreview) => {
                        return <div className='col-1'>
                            <img alt='preview image' style={{height:100}} src={imagePreview} />
                        </div>
                    })
                }
                </div>
            :
                <h1>no images</h1>
            }
            
            
        </div>
    );
}

export default MultiImageUpload;