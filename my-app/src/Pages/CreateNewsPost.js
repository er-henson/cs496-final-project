import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MultiImageUpload from '../Components/MultiImageUpload';

function CreateNewsPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [images, setImages] = useState([]);
    // syntax to add a new image: setImages(current => [...current, newImage])
    
    let navigate = useNavigate();
  
    const addImage = function(image){
        setImages(imgs => [...imgs, image]);
        console.log('image has this many images in it:\n', images.length);
    }

    const handleSubmit = async (e) => {
        // stop the page from reloading
        e.preventDefault();
        
        let newPost = new FormData();
        newPost.append('date', Date.now());
        newPost.append('title', title);
        newPost.append('description', description);
        if(images.length > 0){
            console.log('on submission, images has this many images in it:\n', images.length);
            for(let i = 0; i < images.length; i++){
                newPost.append('newsImages', images[i]);
            }
        }
        if(link !== ''){
            newPost.append('link', link);
        }
        
        console.log(newPost);
        
        // send the meeting to the backend
        axios.post('http://localhost:4000/savenewspost', newPost, {withValidation: true, withCredentials: true})
        .then((response) =>
        {
            console.log(response.data);
            // redirect to the page with upcoming meetings
            let path = '/';
            navigate(path);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }
    
    return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-8">
        {/*page header*/}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Creating Meeting </h1>
          </header>
        </div>
        
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          
          {/*field for setting the topic*/}
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input type="text" className="form-control" id="topic" onChange={(e) => setTitle(e.target.value)} />
          </div>
          {/*field for setting the location*/}
          <div className="form-group">
            <label htmlFor="link">Social Media Link</label>
            <input type="text" className="form-control" id="link" onChange={(e) => setLink(e.target.value)} />
          </div>
          {/*field for setting the description*/}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          
          {/*field for sending an image*/}
          <div className ="form-group">
            <MultiImageUpload imageChange={addImage}/>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
      </div>
    </div>
  );
  
}

export default CreateNewsPost;