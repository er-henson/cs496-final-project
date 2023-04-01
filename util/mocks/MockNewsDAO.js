const fs = require('fs');
const path = require('path');

let img1 = fs.promises.readFile(path.join(__dirname, './internet_blues.jpg'));
Promise.resolve(img1).then(function(buffer){
    img1 = buffer;
});

let img2 = fs.promises.readFile(path.join(__dirname, './how2screenshot.jpeg'));
Promise.resolve(img2).then(function(buffer){
    img2 = buffer;
});

let img3 = fs.promises.readFile(path.join(__dirname, './90s_pattern_2.jpg'));
Promise.resolve(img3).then(function(buffer){
    img3 = buffer;
});


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

exports.create = async function(newsPost)
{
    newsPost._id = 0;
    return newsPost;
}

exports.readAllNews = async function()
{
    return newsPosts;
}