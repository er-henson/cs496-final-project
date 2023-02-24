const dbcon = require('../model/DBConnection');
const dao = require('../model/MeetingDAO');
beforeAll(async function(){
    await dbcon.connect('test');
    //jest.setTimeout(20000);
});
afterAll(async function(){
    await dao.deleteAll();
    await dbcon.disconnect();
});

test('Read all meetings', async function()
{
    await dao.deleteAll();
    let meetings = await dao.readAll();
    expect(meetings.length).toBe(0);
});
test('Creating a new meeting', async function()
{
    let testMeeting = 
    {
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    let createdMeeting = await dao.create(testMeeting);
    expect(createdMeeting.speaker).toBe("mr. monkey");
});
