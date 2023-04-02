let dao = require('../model/NewsDAO');
/*
    setting the DAO, for testing purposes
*/
exports.setDAO = function(otherDAO)
{
    dao = otherDAO;
}

exports.readAllNews = async function(request, response)
{
    let allNews = await dao.readAllNews();
    if(allNews) // if we found news information from the DAO, return it
    {
        response.status(200);
        response.send(allNews);
    }
    else // nothing found
    {
        response.status(404);
        response.send(null);
    }
}

exports.saveNewsPost = async function(request, response)
{
    let requestImages = [];
    // iterate through the images in the request
    if(request.files)
    {
        //console.log(request.files);
        for(let i = 0; i < request.files.length; i++)
        {
            requestImages.push({
                name: request.files[i].originalname,
                data: request.files[i].buffer,
                contentType: 'image/jpeg'
            });
        }
    }
    
    let newsPost = {
        date: request.body.date,
        title: request.body.title,
        description: request.body.description
    }
    
    // if a link is included in the submission, add it
    if(request.body.link !== ''){
        newsPost.link = request.body.link;
    }
    // if there are images in the submission, add them
    if(requestImages.length > 0)
    {
        newsPost.images = requestImages;
    }
    
    // save to DAO
    let savedNewsPost = await dao.create(newsPost);
    
    // conditional response based on DAO return
    if(savedNewsPost)
    {
        response.status(200);
        response.send(savedNewsPost);
    }
    else
    {
        response.status(500);
        response.send(null);
    }
}

/*
POST request
deletes a news Item by its ID
protected by Session

const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

const newsSchema = new mongoose.Schema({
    date: {type:Date, default:Date.now()},
    title: String,
    // making images and social media links optional
    link: {type:String, required: false},
    images:{type: [imageSchema],required: false},
    description: String
});

*/
exports.updateNewsPost = async function(request, response)
{    
    
    // if the requester is logged in as an admin, go through with updating
    if(request.session && request.session.user && request.session.user.admin === 1){
        try{
            let requestImages = [];
            // iterate through the images in the request
            if(request.files)
            {
                //console.log(request.files);
                for(let i = 0; i < request.files.length; i++)
                {
                    requestImages.push({
                        name: request.files[i].originalname,
                        data: request.files[i].buffer,
                        contentType: 'image/jpeg'
                    });
                }
            }
            
            let updatedNewsPost = {
                _id: request.body._id,
                date: request.body.date,
                title: request.body.title,
                description: request.body.description
            }
            
            // if a link is included in the submission, add it
            if(request.body.link !== ''){
                updatedNewsPost.link = request.body.link;
            }
            // if there are images in the submission, add them
            if(requestImages.length > 0)
            {
                updatedNewsPost.images = requestImages;
            }
            
            let returnedPost = await dao.updateNewsItem(updatedNewsPost);
            
            if(returnedPost)
            {
                response.status(204);
                response.send({msg: `news post has been updated`});
            }
            else{
                response.status(404);
                response.send(null);
            }
            

        }
        catch(error){
            console.log(error);
            response.status(500);
            response.send({error: error.message});
        }
    }
    else{
        response.status(401);
        response.send(null);
    }
}

/*
POST request
updates a news Item
protected by Session
*/
exports.deleteNewsPost = async function(request, response)
{
    const postID = request.params.id;
    
    // if the requester is logged in as an admin, go through with deletion
    if(request.session && request.session.user && request.session.user.admin === 1){
        try{
            await dao.deleteNewsPost(postID);
            
            response.status(204);
            response.send({msg: `news post with ID:{postID} has been deleted`});
        }
        catch(error){
            response.status(500);
            response.send({error: error.message});
        }
    }
    else{
        response.status(401);
        response.send(null);
    }
}

/*
    GET request
    finds a news post by its ID
*/
exports.findNewsPostByID = async function(request, response)
{
    const postID = request.params.id;
    
    try{
        let newsPost = await dao.readByID(postID);
        
        if(newsPost)
        {
            response.status(200);
            response.send(newsPost);
        }
        else
        {
            response.status(404);
            response.send(null);
        }
    }
    catch(error){
        console.log(error);
        response.status(500);
        response.send({msg: 'an error occurred'});
    }
}