import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageUpload(props){
    /* set the file to 'null' initially */
    const [imagePreview, setImagePreview] = useState();
    const [image, setImage] = useState();
    
    
    /* function to set the file upon changing on the page */
    const onImageChange = (event, otherFunc) => {
        if(event.target.files && event.target.files[0])
        {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            
            setImage(event.target.files[0]);
            
            // this is meant to update the value on the page that calls this component
            otherFunc(event.target.files[0]);
            
            console.log("event.target.files[0] is: ", event.target.files[0]);
            //console.log("image is: ", image);
        }
    };
    useEffect(() => {console.log('image is: ', image)}, [image]);
    
    
    /* function to save the image to the backend  *
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(image)
        {
            /* must be a FormData object for the submission to work *
            let user_image = new FormData();
            /* it is SUPER important that the first parameter (in this case, 'user_img'),
               is the exact same here as it is on the backend when using this specific request.

               this is the 'fieldname' attribute, and multer is very strict about its field names.
               further, the error message is pretty vague, so it's hard to figure out what and where exactly
               the error is if it crops up. *
            user_image.append('user_img', image);
            
            // send the image to the backend
            axios.post('http://localhost:4000/imageupload', user_image,
                {
                    /* when uploading images, this header is SUPER important. you must
                       specify that it's a multipart form in the header or else multer
                       will not read it. 
                       
                       note that you can send other, normal text form data 
                       *
                    headers:{
                        'Content-type': 'multipart/form-data'
                    }
                })
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                
            });
        }
    };
    */
    
    
    return (
        <div>
            {/* the 'name' attribute here is the same as that in the 'formdata.append' function, which is very important */}
            {/* <input type='file' name='user_img' onChange={onImageChange} /> */}
            
            <input type='file' name='user_img' onChange={
                (event) => {
                    /* props.imageChange - function that accepts the image file.
                            if using this component on another and you want
                            to set the state of the other page to the image,
                            you can pass the `setImage` hook or its equivalent
                            as a prop to this component (see CreateMeeting.js
                            for an example).
                    */
                    onImageChange(event, props.imageChange);
                    }
                } />

            {/* this is for the preview. not necessary in the uploading process, but still
                a good feature to have. */}
            <img alt='preview image' style={{height:400}} src={imagePreview}/>
            
        </div>
    );
    
}

export default ImageUpload