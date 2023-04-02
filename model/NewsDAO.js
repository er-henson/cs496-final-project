/*
The schema for storing data related to PRSSA news, including social media posts
*/

const mongoose = require('mongoose');

/*
    Important data fields:
    Date
    Title
    Link
    Images
    Description
*/

/* making a sub-schema for images to hold an array of them */
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

const newsModel = mongoose.model('NewsPost', newsSchema);

/*
    function to create a news post for the site.
    assumes the `newsPost` parameter is a JSON object
    with all of the same fields as specified in the 
    `newsSchema`
*/
exports.create = async function(newsPost)
{
    const mongoNewsPost = new newsModel(newsPost);
    await mongoNewsPost.save();
    return await exports.readByID(mongoNewsPost._id);
}

/*
    function to read a specific news post by id
*/
exports.readByID = async function(id)
{
    let newsPost = await newsModel.findById(id).lean();
    return newsPost;
}

/*
    function to grab all news posts
*/
exports.readAllNews = async function()
{
    let newsPosts = await newsModel.find({}).lean();
    return newsPosts;
}

/*
    function to delete a news item by its ID
*/
exports.deleteNewsPost = async function(postID)
{
    await newsModel.deleteOne({_id:postID}).lean();
}


/*
    function to update a news item
*/
exports.updateNewsItem = async function(postData)
{
    let editedPost = await newsModel.findOneAndUpdate( {_id:postData._id}, postData, {returnOriginal: false} ).lean();
    return editedPost;
}


/*
    function to delete all posts
    EXTREMELY DANGEROUS. FOR TESTING PURPOSES ONLY.
*/
exports.deleteAll = async function()
{
    await newsModel.deleteMany();
}