const dbcon = require('../model/DBConnection');
const dao = require('../model/UserDAO');

beforeAll(async function(){
    await dbcon.connect('test');
});
afterAll(async function(){
    await dao.deleteAll();
    await dbcon.disconnect();
});

test('Create new user', async function()
{
    // creating data to insert
    let newUser = 
    {
        username: "dave",
        email: "sneakman@jetset.net",
        password: "i have no time for secrets!",
        admin: 0
    };
    // testing the 'create' function
    let newAcct = await dao.create(newUser);
    // verifying
    expect(newAcct.username).toBe(newUser.username);
    expect(newAcct.email).toBe(newUser.email);
});

test('Create new user when there is an existing user with the same email', async function()
{
    //creating data to insert
    let newUser = 
    {
        username: "dave2",
        email: "sneakerman@jetset.net",
        password: "i have no time for secrets!",
        admin: 0
    };
    let otherUser =
    {
        username: "dave also",
        email: "sneakerman@jetset.net",
        password: "i too have no time for secrets",
        admin: 0
    }
    let newAcct = await dao.create(newUser);
    let altAcct = await dao.create(otherUser);
    // verifying
    expect(newAcct.username).toBe(newUser.username);
    expect(newAcct.email).toBe(newUser.email);
    // alt account should be null
    expect(altAcct).toBe(null);
});

test('Login with correct credentials', async function()
{
    let retUser = await dao.login("sneakman@jetset.net", "i have no time for secrets!");
    expect(retUser.username).toBe("dave");
    expect(retUser.admin).toBe(0);
});

test('Login with incorrect credentials', async function()
{
    let retUser = await dao.login("sneakman@jetset.net", "i, in fact, do have time for secrets!");
    expect(retUser).toBe(null);
});