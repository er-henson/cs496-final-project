import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function NewsPage()
{
    const navigate = useNavigate();
    const [news,setNews] = React.useState([]);
    const [user, setUser] = React.useState(null);
    
    
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/getnews")
        .then((response) => {
            setNews(response.data);
        })
        
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
        axios.post(`http://localhost:4000/deletenews/${postID}`)
        .then(() => {
            const updatedNews = news.filter(newsPost => newsPost._id !== postID);
            setNews(updatedNews);
        })
        .catch()
    }

    
    return(
    <div className="d-flex justify-content-center align-items-center">
        <div className="col-12">
    
            {/*page header*/}
            <div style={{ backgroundColor: '#84B9F9' }}>
              <header className="mt-2 p-4 text-white text-center rounded">
                <h1 style={{ fontWeight: 700, color: '#ffffff' }}> News and Events </h1>
              </header>
            </div>
            
            <div className="d-flex justify-content-center align-items-center">
    {/* statement that checks for news. If it's there, display it. If not, show that there is no news */}
    {news && news.map && (news.length > 0) ? // the 'if' condition. if 'meetings' and 'meetings.map' are not null,...
        <ul>
        {news.map((newsPost) => (
            <div>
                <li className="page_li">
                    <div className='row'>
                        <div className='col-lg-11'>
                            {/* buttons for editing or deleting a meeting.
                                TODO - make it so these only appear to logged-in admins */}
                            {user && user.admin === 1 ?
                            <>
                                <button className="btn" style={{backgroundColor:'#B59EC1'}} onClick={()=>{toEditPage(newsPost._id)}}> Edit </button>
                            <span> </span>
                                <button className="btn" style={{backgroundColor:'#B59EC1'}} onClick={()=>{handleDelete(newsPost._id)}}> Delete </button>
                            </>
                            :
                            <></>
                            }
                            {/* layout for the news post itself. */}
                            <p><span style={{fontWeight: 700}}>{newsPost.title} </span></p>
                            <p>{newsPost.description}</p>
                            
                        </div>
                        {/* check to see if there are images included with this news post. if so, display them. */
                        newsPost.images && newsPost.images.map ?
                            <div>
                            {newsPost.images.map((image) => (
                                <span>
                                    <img alt='no image'src={`data:image/jpeg;base64,${image.data}`} style={{height:150}}/>
                                </span>
                            ))}
                            </div>
                        :
                            <></>
                        }
                    </div>
                </li>
            </div>
        ))}
        </ul>
        :
        <h1>No News Found</h1>
    }
    </div>
    
        </div>
    </div>
);
}
export default NewsPage