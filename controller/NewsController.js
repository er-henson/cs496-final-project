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
        console.log(request.files);
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