const userController = require('../controller/UserController');
const conIntercept = require('../util/ControllerInterceptor');
const mockDao = require('../util/mocks/MockUserDao');



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
    
    expect(res.status).toHaveBeenCalledWith(300);
    expect(res.redirect).toHaveBeenCalledWith('/Login');
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
    
    expect(res.status).toHaveBeenCalledWith(300);
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