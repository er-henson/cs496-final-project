const userController = require('../controller/UserController');
const conIntercept = require('../util/ControllerInterceptor');
const mockDao = require('../util/mocks/MockUserDao');
const passUtil = require('../util/PasswordUtil');
const { ObjectId } = require('mongodb');



// set the DAO to the mock DAO
beforeAll(function()
{
    userController.setDAO(mockDao);
});

test('Create an account', async function()
{
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let testUser = 
    {
        email: 'jacob@the_hills',
        username: 'immortal jakob',
        password: 'the unbreakable code',
    };
    
    req.body = testUser;
    await userController.saveUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
});

test('Create an account with an existing user email', async function()
{
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let testUser = 
    {
        email: 'phil@somewhere',
        username: 'not phil',
        password: 'this is not phils password',
    };
    
    req.body = testUser;
    await userController.saveUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith( {msg: 'User with that email already exists'} );
    expect(res.end).toHaveBeenCalled();
});

test('Login with correct credentials', async function()
{
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.body.email = 'phil@somewhere';
    req.body.password = 'phils pw';
    
    await userController.login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: null,
        admin: 0
    });
    expect(req.session.user).toStrictEqual(
        {
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: null,
        admin: 0
    }
    );
});

test('Login with incorrect credentials', async function()
{
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.body.email = 'phil@somewhere';
    req.body.password = 'not phils pw';
    
    await userController.login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith( {msg:'Invalid credentials'} );
    expect(res.end).toHaveBeenCalled();
});

test('Get the logged-in user while logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = {
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: null,
        admin: 0
    };
    
    await userController.getLoggedUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: null,
        admin: 0
    });
});

test('Get the logged-in user while not logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = null;
    
    await userController.getLoggedUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({msg: 'Unauthorized'});
});

test('Logout while logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = {
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: null,
        admin: 0
    };
    
    await userController.logout(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(req.session.user).toBe(null);
    expect(res.send).toHaveBeenCalledWith(null);
});

test('Logout while not logged in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = null;
    
    await userController.logout(req, res);
    
    expect(res.status).toHaveBeenCalledWith(409);
    expect(req.session.user).toBe(null);
    expect(res.send).toHaveBeenCalledWith(null);
});
test('Update User Account', async function(){

    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let existingUser = {
        _id: 'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    
    req.body = existingUser;
    await userController.saveUser(req, res);


    //Update User, given that
    let req2 = conIntercept.mockRequest();
    let res2 = conIntercept.mockResponse();
    let request2 = {
             _id: 'abc',
              username: "johndoe2",
              email: "johndoe2@example.com",
              password: "mypassword2",
              admin: 0
          };
        req2.body = request2;
        await userController.updateUser(req2, res2);
        expect(res2.status).toHaveBeenCalledWith(202); // Verify that the response status is set to 202

});
