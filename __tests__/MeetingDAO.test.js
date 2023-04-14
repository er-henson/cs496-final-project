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


test('Finding a future meeting', async function()
{
    let futureMeeting = 
    {
        date: new Date("February 18, 2024"),
        speaker: "john carmack",
        topic: "how i invented all computers everywhere",
        location: "in a doom multiplayer lobby",
        content: "this meeting will happen in the future"
    };
    let pastMeeting = 
    {
        date: new Date("February 7, 2022"),
        speaker: "tardigrade",
        topic: "surviving anything except actual threats",
        location: "the vacuum of space under high radiation",
        content: "this meeting has already happened"
    };
    
    let createdFutureMeeting = await dao.create(futureMeeting);
    let createdPastMeeting = await dao.create(pastMeeting);
    
    // function in question that we want to test
    let storedFutureMeeting = await dao.getUpcomingMeetings();
    
    expect(storedFutureMeeting.length).toBe(1);
    expect(storedFutureMeeting[0].speaker).toBe(futureMeeting.speaker);
    expect(storedFutureMeeting[0].topic).toBe(futureMeeting.topic);
    expect(storedFutureMeeting[0].content).toBe(futureMeeting.content);
});

test('Finding a past meeting', async function()
{
    let pastMeeting = 
    {
        date: new Date("February 7, 2022"),
        speaker: "tardigrade",
        topic: "surviving anything except actual threats",
        location: "the vacuum of space under high radiation",
        content: "this meeting has already happened"
    };
    
    // function in question that we want to test
    let storedPastMeeting = await dao.getPastMeetings();
    //console.log(storedPastMeeting);
    
    // setting the length to '2' because the 'mr. monkey' meeting is still in the DB
    // same reason that the pastMeeting in this test is at index '1' instead of '0'
    expect(storedPastMeeting.length).toBe(2);
    expect(storedPastMeeting[1].speaker).toBe(pastMeeting.speaker);
    expect(storedPastMeeting[1].topic).toBe(pastMeeting.topic);
    expect(storedPastMeeting[1].content).toBe(pastMeeting.content);
});

test('Updating a meeting', async function()
{
    // grab a meeting in the database
    let meetings = await dao.readAll();
    let firstMeeting = meetings[0];
    let firstMeetingID = firstMeeting._id;
    
    // change everything about it except its ID
    firstMeeting.date = new Date("August 7 2021");
    firstMeeting.speaker = "dr breen";
    firstMeeting.topic = "why living in city 17 is awesome";
    firstMeeting.location = "city 17 obviously";
    firstMeeting.content = "Welcome. Welcome to City 17.You have chosen, or been chosen, to relocate to one of our finest remaining urban centers. I thought so much of City 17 that I elected to establish my Administration here, in the Citadel so thoughtfully provided by Our Benefactors. I have been proud to call City 17 my home. And so, whether you are here to stay, or passing through on your way to parts unknown, welcome to City 17. It's safer here.";
    
    // create the update
    await dao.updateMeeting(firstMeeting);
    
    // query for the meeting again
    let newMeeting = await dao.readByID(firstMeetingID);
    
    expect(newMeeting.topic).toBe(firstMeeting.topic);
    expect(newMeeting.speaker).toBe(firstMeeting.speaker);
    expect(newMeeting.content).toBe(firstMeeting.content);
});

test('Deleting a meeting', async function()
{
    // create a test meeting
    let testMeeting =
    {
        date: new Date("April 10, 2023"),
        speaker: "Jane Smith",
        topic: "Introduction to Programming",
        location: "Online",
        content: "This meeting is an introduction to programming concepts."
    };
    
    let createdMeeting = await dao.create(testMeeting);
    let meetingID = createdMeeting._id;

    // delete the meeting
    await dao.deleteMeeting(meetingID);

    // query for the meeting again
    let deletedMeeting = await dao.readByID(meetingID);

    // expect the deleted meeting to be null
    expect(deletedMeeting).toBeNull();
});

test('Searching through several meetings with text search', async function(){
    let tm1 =
    {
        date: new Date("April 10, 2023"),
        speaker: "Jane Smith",
        topic: "Introduction to Programming",
        location: "Online",
        content: "This meeting is an introduction to programming concepts."
    };
    
    let tm2 =
    {
        date: new Date("April 10, 10"),
        speaker: "Emperor Augustus",
        topic: "Rome and the conception of peace",
        location: "Roman Forum",
        content: "Specifically discussing the term 'Pax Romana'."
    };
    
    let tm3 =
    {
        date: new Date("March 3, 1971"),
        speaker: "Vito Corleone",
        topic: "Mafia-ing for dummies",
        location: "1970s New York",
        content: "Discussing how to build a successful mafia empire."
    };
    
    let createdM1 = await dao.create(tm1);
    let createdM2 = await dao.create(tm2);
    let createdM3 = await dao.create(tm3);
    
    let searchRes = await dao.searchMeetings("new york");
    
    expect(searchRes.length).toBe(1);
    expect(searchRes[0].speaker).toBe(tm3.speaker);
});

