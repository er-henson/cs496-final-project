import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function EditNewsPost(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [images, setImages] = useState([]);
    
    const loc = useLocation();
    const navigate = useNavigate();
    
    let meetingID = loc.state.id;
    
    const addImage = function(image){
        setImages(imgs => [...imgs, image]);
        console.log('image has this many images in it:\n', images.length);
    }
    
    
    /*
        set default values to what is retrieved from the GET request
    */
    useEffect(() => {
        
        axios.get("http://localhost:4000/news/" + meetingID)
        .then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            if(response.data.link)
            {
                setLink(response.data.link);
            }
            if(response.data.images)
            {
                setImages(response.data.images);
            }
        })
        .catch((error) => {
            console.log('error in meeting GET request');
            console.log(error);
        });
        
    }, []);
    
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        let updatedPost = new FormData();
        updatedPost.append('date', Date.now());
        updatedPost.append('title', title);
        updatedPost.append('description', description);
        if(images.length > 0){
            for(let i = 0; i < images.length; i++){
                updatedPost.append('newsImages', images[i]);
            }
        }
        if(link !== ''){
            updatedPost.append('link', link);
        }
        
        
        // send the meeting to the backend
        axios.post('http://localhost:4000/savenewspost', newPost, {withValidation: true})
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
}

export default EditNewsPost;