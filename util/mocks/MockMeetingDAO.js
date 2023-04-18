const fs = require('fs');
const path = require('path');


let img1name = 'internet_blues.jpg';
let img1 = fs.readFileSync(path.join(__dirname, './internet_blues.jpg'));


let img2name = './how2screenshot.jpeg';
let img2 = fs.readFileSync(path.join(__dirname, './how2screenshot.jpeg'));


let img3name = './90s_pattern_2.jpg';
let img3 = fs.readFileSync(path.join(__dirname, './90s_pattern_2.jpg'));



let mockMeetings = [
    {
        date: new Date("June 3, 2025 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content.",
        img:
            {
                originalname:'internet_blues.jpg',
                buffer:img1
            }
    },
    {
        date: new Date("February 19, 2021 12:10:00"),
        speaker: "louis",
        topic: "surviving the zombie apocalypse for dummies",
        location: "abandoned mall",
        content: "l4d is fun you should get it",
        img:
            {
                originalname:'90s_pattern_2.jpg',
                buffer:img3
            }
    }
]

exports.create = async function(newsPost)
{
    newsPost._id = 0;
    return newsPost;
}

exports.readAll = async function()
{
    return mockMeetings;
}

exports.getPastMeetings = async function()
{
    return [mockMeetings[0]];
}

exports.getUpcomingMeetings = async function()
{
    return [mockMeetings[1]];
}

exports.readByID = async function(id)
{
    if(id < 2 && id >= 0){
        return mockMeetings[id];
    }
    else{
        return null;
    }
}

exports.updateMeeting = async function(updatedMeeting)
{
    if(updatedMeeting._id < 2 && updatedMeeting._id >= 0){
        return updatedMeeting;
    }
    else{
        return null;
    }
}

exports.deleteMeeting = async function(id)
{
    if(id < 2 && id >= 0){
        return mockMeetings[id];
    }
    else{
        throw new Error('ID is not valid');
    }
}

exports.searchMeetings = async function(query)
{
    console.log(query.localeCompare('monkey'))
    if(query.localeCompare('monkey') === 0){
        return [mockMeetings[0]];
    }
    else{
        return [];
    }
}