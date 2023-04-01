const dbcon = require('../model/DBConnection');
const dao = require('../model/NewsDAO');

const fs = require('fs');
const path = require('path');

beforeAll(async function(){
    await dbcon.connect('test');
    //jest.setTimeout(20000);
});
afterAll(async function(){
    await dao.deleteAll();
    await dbcon.disconnect();
});

test('Creating a news post with all required fields', async function(){
    // reading a file into a buffer
    let img1name = 'internet_blues.jpg';
    let img1 = fs.readFileSync(path.join(__dirname, '../util/mocks/internet_blues.jpg'));
    
    let img2name = 'how2screenshot.jpeg';
    let img2 = fs.readFileSync(path.join(__dirname, '../util/mocks/how2screenshot.jpeg'));
    
    let testNewsPost = 
    {
        date: new Date('February 18, 2023 12:10:00'),
        title:'GRAND posting',
        link:'https://youtu.be/nF-xdiL7Nr0',
        images:[
            {
                name:img1name,
                data:img1,
                contenType:'image/jpeg'
            },
            {
                name:img2name,
                data:img2,
                contenType:'image/jpeg'
            }
        ],
        description:'fleentstones!?'
    };
    
    let createdNewsPost = await dao.create(testNewsPost);
    
    // note: can't exactly check for buffer equality since i think MongoDB changes the buffer when it stores it
    expect(createdNewsPost.title).toBe(testNewsPost.title);
    expect(createdNewsPost.images.length).toBe(2);
    expect(createdNewsPost.images[0].name).toBe(testNewsPost.images[0].name);
    expect(createdNewsPost.images[1].name).toBe(testNewsPost.images[1].name);
    
});

test('Creating a news post with missing non-required fields', async function(){
    
    let testNewsPost = 
    {
        date: new Date('February 18, 2023 12:10:00'),
        title:'GRAND posting',
        description:'fleentstones!?'
    };
    
    let createdNewsPost = await dao.create(testNewsPost);
    
    expect(createdNewsPost.title).toBe(testNewsPost.title);
    expect(createdNewsPost.description).toBe(testNewsPost.description);
    
});

test('Reading created news post by ID', async function(){
    
    let testNewsPost = 
    {
        date: new Date('February 19, 2023 12:10:00'),
        title:'bing soy',
        description:'odd tf2 player'
    };
    
    let createdNewsPost = await dao.create(testNewsPost);
    let readNewsPost = await dao.readByID(createdNewsPost._id);
    
    expect(readNewsPost.title).toBe(testNewsPost.title);
    expect(readNewsPost.description).toBe(testNewsPost.description);
    
});

test('Reading all created news posts', async function(){
    let allNews = await dao.readAllNews();
    // should be 3 from the previous three tests that each add a new post
    expect(allNews.length).toBe(3);
});