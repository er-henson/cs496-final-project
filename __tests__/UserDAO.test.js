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

test('Read user information from username', async function()
{
    //creating data to insert
    let newUser = 
    {
        username: "dave2",
        email: "sneakerman@jetset.net",
        password: "i have no time for secrets!",
        admin: 0
    };
    
    // save user to the DB
    //await dao.create(newUser);
    
    // read user based on username
    let returnedUser = await dao.readByName(newUser.username);
    console.log(returnedUser);
    
    expect(returnedUser[0].email).toBe(newUser.email);
});

test('Read user information from email', async function()
{
    //creating data to insert
    let newUser = 
    {
        username: "dave2",
        email: "sneakerman@jetset.net",
        password: "i have no time for secrets!",
        admin: 0
    };
    
    // save user to the DB
    //await dao.create(newUser);
    
    // read user based on email
    let returnedUser = await dao.readByEmail(newUser.email);
    console.log(returnedUser);
    
    expect(returnedUser.username).toBe(newUser.username);
});
test('Update user by ID', async function() {
    // creating a user to update
    let newUser = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password",
      admin: 0
    };
    let createdUser = await dao.create(newUser);
  
    // updating the user's email
    let updatedUser = {
      email: "updated@example.com"
    };
    let updated = await dao.update(createdUser._id, updatedUser);
  
    // verifying the update was successful
    expect(updated.email).toBe(updatedUser.email);
  });