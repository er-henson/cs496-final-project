const newsController = require('../controller/NewsController');
const conIntercept = require('../util/ControllerInterceptor');
const mockDAO = require('../util/mocks/MockNewsDAO');

const fs = require('fs');
const path = require('path');


// set the DAO to the mock DAO
beforeAll(function()
{
    newsController.setDAO(mockDAO);
});

test('Creating a news post with images', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let img1 = fs.promises.readFile(path.join(__dirname, '../util/mocks/internet_blues.jpg'));
    Promise.resolve(img1).then(function(buffer){
        img1 = buffer;
    });
    
    // defining the form to test with
    let images =[
        {
            originalname:'internet_blues.jpg',
            buffer:img1
        }];
    
    let testNewsPost = 
    {
        date: Date.now(),
        title: 'dooooom',
        link: 'https://youtu.be/UQpKcrOzF1k',
        description: 'i dunnno, something',
    };
    
    
    req.files = images;
    req.body = testNewsPost;
    
    await newsController.saveNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
    // defining what should be returned
    let retNewsPost = testNewsPost;
    retNewsPost.images = [
        {
            data:images[0].buffer,
            name:images[0].originalname,
            contentType:'image/jpeg'
        }
    ];
    retNewsPost._id = 0;
    
    expect(res.send).toHaveBeenCalledWith(retNewsPost);
    
    
});

test('Creating a news post without images', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let testNewsPost = 
    {
        date: Date.now(),
        title: 'dooooom',
        link: 'https://youtu.be/UQpKcrOzF1k',
        description: 'i dunnno, something',
    };
    
    req.body = testNewsPost;
    
    await newsController.saveNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
    // defining what should be returned
    let retNewsPost = testNewsPost;
    retNewsPost._id = 0;
    retNewsPost.images = [];
    
    expect(res.send).toHaveBeenCalledWith(retNewsPost);
    
    
});

test('Reading all news posts', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    // need to read these images in to test the ReadAll for the mock
    let img1 = fs.promises.readFile(path.join(__dirname, '../util/mocks/internet_blues.jpg'));
    Promise.resolve(img1).then(function(buffer){
        img1 = buffer;
    });

    let img2 = fs.promises.readFile(path.join(__dirname, '../util/mocks/how2screenshot.jpeg'));
    Promise.resolve(img2).then(function(buffer){
        img2 = buffer;
    });

    let img3 = fs.promises.readFile(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    Promise.resolve(img3).then(function(buffer){
        img3 = buffer;
    });
    
    
    
    await newsController.readAllNews(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    // just copy/pasted the news post array from the mock
    expect(res.send).toHaveBeenCalledWith([
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
    ]);
});