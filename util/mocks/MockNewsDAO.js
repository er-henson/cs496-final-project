const fs = require('fs');
const path = require('path');


let img1name = 'internet_blues.jpg';
let img1 = fs.readFileSync(path.join(__dirname, './internet_blues.jpg'));


let img2name = './how2screenshot.jpeg';
let img2 = fs.readFileSync(path.join(__dirname, './how2screenshot.jpeg'));


let img3name = './90s_pattern_2.jpg';
let img3 = fs.readFileSync(path.join(__dirname, './90s_pattern_2.jpg'));



let newsPosts = [
    {
        _id: 0,
        date: "2021",
        title: "old meme",
        link: "https://youtu.be/gWo12TtN9Kk",
        description: "THE ONE PIECE IS REEEAAALLL",
        images: [
            {
                originalname:'internet_blues.jpg',
                buffer:img1
            },
            {
                originalname:'how2screenshot.jpeg',
                buffer:img2
            }]
    },
    {
        _id: 1,
        date: "1917",
        title: "pretty good song",
        link: "https://youtu.be/B7PwqzBgBls",
        description: "i think this song is good",
        images: [
            {
                originalname:'90s_pattern_2.jpg',
                buffer:img3
            }]
    }
]
let called = 0;


exports.create = async function(newsPost)
{
    newsPost._id = 0;
    return newsPost;
}

exports.readAllNews = async function()
{
    if(called == 0){
        called+=1;
        return null;
    }
    else{
        return newsPosts;
    }
}

exports.deleteNewsPost = async function(postID)
{
    if(postID === -1){
        throw new Error('500 Internal Server Error');;
    }
    else{
        return;
    }
}

exports.updateNewsItem = async function(newsPost)
{
    if (newsPost._id === newsPosts[0]._id || newsPost._id === newsPosts[1]._id )
    {
        return newsPost;
    }
    else{
        return null;
    }
}

exports.readByID = async function(postID)
{
    if (postID === newsPosts[0]._id)
    {
        return newsPosts[0];
    }
    else if(postID === newsPosts[1]._id )
    {
        //return newsPosts[1];
    }
    else{
        return null;
    }
}