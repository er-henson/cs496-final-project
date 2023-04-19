import React, {useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed';

function ViewNewsPost() {
    const [newsPost,setNewsPost] = React.useState([]);
    const [user, setUser] = React.useState(null);
    
    const loc = useLocation();
    const navigate = useNavigate();
    let newsID = loc.state.id;
    
    useEffect(() => {
        
        // get the information for the news post from its ID
        axios.get("http://localhost:4000/news/" + newsID)
        .then((response) => {
            setNewsPost(response.data);
        })
        .catch((error) => {
            console.log('error in meeting GET request');
            console.log(error);
        });
        
        // get the information for the logged-in user to know if they're an admin
        axios.get('http://localhost:4000/getlogged', {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        })
        .catch((error) => {
            console.log('user not logged in');
        })
        
    }, []);
    
    const toEditPage = (postID) => {
        navigate('/EditNewsPost', {state:{id:postID}});
    }
    
    const handleDelete = (postID) => {
        let confirmDelete = window.confirm("Are you sure you want to delete this news entry? This cannot be undone.");
        if(confirmDelete){
            axios.post(`http://localhost:4000/deletenews/${postID}`)
            .then(() => {
                navigate('/Home');
            })
            .catch()
        }
    }
    
    
    return (
    <div className='d-flex justify-content-center align-items-center'>
        
        <div className='row'>
            <div className='col-lg-11'>
                {/* buttons for editing or deleting an entry.
                    only appear to logged-in admins */}
                {user && user.admin === 1 ?
                <>
                    <button className="btn" style={{backgroundColor:'#84B9F9'}} onClick={()=>{toEditPage(newsPost._id)}}> Edit </button>
                <span> </span>
                    <button className="btn" style={{backgroundColor:'#84B9F9'}} onClick={()=>{handleDelete(newsPost._id)}}> Delete </button>
                </>
                :
                <></>
                }
                {/* layout for the news post itself. */}
                <p><span style={{fontWeight: 700}}>{newsPost.title} </span></p>
                <p>{newsPost.description}</p>
                {newsPost.link ? 
                        <div>
                        <InstagramEmbed url={newsPost.link} width={328}/>
                        </div>
                    :
                        <></>
                }
                
            </div>
            {/* check to see if there are images included with this news post. if so, display them. */
            newsPost.images && newsPost.images.map ?
                <div>
                {newsPost.images.map((image) => (
                    <span>
                        <img alt='no image'src={`data:image/jpeg;base64,${image.data}`} style={{height:200}}/>
                    </span>
                ))}
                </div>
            :
                <></>
            }
        </div>
        
    </div>
);    
}

export default ViewNewsPost;