const newsController = require('../controller/NewsController');
const conIntercept = require('../util/ControllerInterceptor');
const mockDAO = require('../util/mocks/MockNewsDAO');

const fs = require('fs');
const path = require('path');


let adminUser = {
    username: 'billy',
    email:'thekid@hotshot.net',
    password:'something',
    admin:1
};

let normalUser = {
    username: 'jakob',
    email:'dusker@hotspot.net',
    password:'something else',
    admin:0
};

// set the DAO to the mock DAO
beforeAll(function()
{
    newsController.setDAO(mockDAO);
});
test('Reading all news posts when there are none', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    await newsController.readAllNews(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    // just copy/pasted the news post array from the mock
    expect(res.send).toHaveBeenCalledWith(null);
});
test('Reading all news posts', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    // need to read these images in to test the ReadAll for the mock
    let img1 = fs.readFileSync(path.join(__dirname, '../util/mocks/internet_blues.jpg'));

    let img2 = fs.readFileSync(path.join(__dirname, '../util/mocks/how2screenshot.jpeg'));

    let img3 = fs.readFileSync(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    
    
    
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

test('Creating a news post with images as admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    
    let img1name = 'internet_blues.jpg';
    let img1 = fs.readFileSync(path.join(__dirname, '../util/mocks/internet_blues.jpg'));
    
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

test('Creating a news post without images as admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
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
    
    expect(res.send).toHaveBeenCalledWith(retNewsPost);
    
    
});

test('Creating a news post without images as non-admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    
    let testNewsPost = 
    {
        date: Date.now(),
        title: 'dooooom',
        link: 'https://youtu.be/UQpKcrOzF1k',
        description: 'i dunnno, something',
    };
    
    req.body = testNewsPost;
    
    await newsController.saveNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
});

test('Creating a news post without images while not logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = null;
    
    let testNewsPost = 
    {
        date: Date.now(),
        title: 'dooooom',
        link: 'https://youtu.be/UQpKcrOzF1k',
        description: 'i dunnno, something',
    };
    
    req.body = testNewsPost;
    
    await newsController.saveNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
});


test('Deleting a news post while logged in as admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    req.params.id = '1';
    
    await newsController.deleteNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(204);
});
test('Deleting a news post while logged in as admin,but throw a 500', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    req.params.id = -1;
    
    await newsController.deleteNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
});



test('Deleting a news post while logged in as a normal user', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    req.params.id = '1';
    
    await newsController.deleteNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
});

test('Deleting a news post while not logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.params.id = '1';
    
    await newsController.deleteNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
});

test('Updating an existing news post as an admin', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    let img3 = fs.readFileSync(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    
    // defining the form to test with
    let images =[
        {
            originalname:'internet_blues.jpg',
            buffer:img3
        }];
    
    let testNewsPost = 
    {
        _id: 0,
        date: "1897",
        title: "ancient meme",
        link: "https://youtu.be/gWo12TtN9Kk",
        description: "* muffled sounds of gorilla violence *",
    };
    
    
    req.files = images;
    req.body = testNewsPost;
    
    await newsController.updateNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith({msg: `news post has been updated`})
});

test('Updating a non-existing news post as an admin', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    
    let img3 = fs.readFileSync(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    
    // defining the form to test with
    let images =[
        {
            originalname:'internet_blues.jpg',
            buffer:img3
        }];
    
    let testNewsPost = 
    {
        _id: 7,
        date: "1897",
        title: "ancient meme",
        link: "https://youtu.be/gWo12TtN9Kk",
        description: "* muffled sounds of gorilla violence *",
    };
    
    
    req.files = images;
    req.body = testNewsPost;
    
    await newsController.updateNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(null)
});

test('Updating a news post as a non-admin', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    
    
    let img3 = fs.readFileSync(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    
    // defining the form to test with
    let images =[
        {
            originalname:'internet_blues.jpg',
            buffer:img3
        }];
    
    let testNewsPost = 
    {
        _id: 0,
        date: "1897",
        title: "ancient meme",
        link: "https://youtu.be/gWo12TtN9Kk",
        description: "* muffled sounds of gorilla violence *",
    };
    
    
    req.files = images;
    req.body = testNewsPost;
    
    await newsController.updateNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null)
});

test('Updating a news post while not logged in', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    
    let img3 = fs.readFileSync(path.join(__dirname, '../util/mocks/90s_pattern_2.jpg'));
    
    // defining the form to test with
    let images =[
        {
            originalname:'internet_blues.jpg',
            buffer:img3
        }];
    
    let testNewsPost = 
    {
        _id: 0,
        date: "1897",
        title: "ancient meme",
        link: "https://youtu.be/gWo12TtN9Kk",
        description: "* muffled sounds of gorilla violence *",
    };
    
    
    req.files = images;
    req.body = testNewsPost;
    
    await newsController.updateNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null)
});

test('Finding an existing news post by its ID', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let img1 = fs.readFileSync(path.join(__dirname, '../util/mocks/internet_blues.jpg'));

    let img2 = fs.readFileSync(path.join(__dirname, '../util/mocks/how2screenshot.jpeg'));
    
    
    req.params.id = 0;
    
    let newsPost = await newsController.findNewsPostByID(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(    {
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
    });
});


test('Finding a non-existing news post by its ID', async function() {
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();    
    
    req.params.id = 7;
    
    let newsPost = await newsController.findNewsPostByID(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(null);
});
test('Creating a news post with DAO error', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    // Make the DAO return null to simulate an error
    mockDAO.create = jest.fn(() => null);
    
    await newsController.saveNewsPost(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(null);
    
    // Restore the original DAO function
    mockDAO.create = jest.fn(() => { /*...*/ });
    
});