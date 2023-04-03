const SpeakerController = require('../controller/SpeakerController');
//const SpeakerDAO = require('../model/SpeakerDAO');

describe('SpeakerController', () => {

beforeEach(() => {
mockDao = {
create: jest.fn(),
readAll: jest.fn(),
};
SpeakerController.setDAO(mockDao);
request = {
body: {
name: 'Test Speaker 1',
phone: '123-456-7890',
email: 'test1@example.com',
mailing_address: '123 Main St',
specialty: 'Testing'
},
};
response = {
status: jest.fn().mockReturnThis(),
send: jest.fn(),
};
});

describe('saveSpeaker', () => {
it('should call dao.create with the new speaker object', async () => {
await SpeakerController.saveSpeaker(request, response);

  expect(mockDao.create).toHaveBeenCalledTimes(1);
  expect(mockDao.create).toHaveBeenCalledWith(request.body);
});

it('should send the saved speaker in the response', async () => {
  const savedSpeaker = { id: 1, ...request.body };
  mockDao.create.mockReturnValue(savedSpeaker);

  await SpeakerController.saveSpeaker(request, response);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledWith(savedSpeaker);
});
});

describe('readAllSpeakers', () => {
it('should call dao.readAll', async () => {
await SpeakerController.readAllSpeakers(request, response);

  expect(mockDao.readAll).toHaveBeenCalledTimes(1);
});

it('should send all speakers in the response', async () => {
  const allSpeakers = [{ id: 1, ...request.body }];
  mockDao.readAll.mockReturnValue(allSpeakers);

  await SpeakerController.readAllSpeakers(request, response);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledWith(allSpeakers);
});
});
describe('readAllSpeakers', () => {
it('should return an array containing the added speaker', async () => {
// Save a new speaker
const newSpeaker = {
date: '2023-03-01',
speaker: 'John Doe',
topic: 'Testing Jest',
location: 'Online',
content: 'This is a test speaker.',
};
mockDao.create.mockReturnValue(newSpeaker);

  await SpeakerController.saveSpeaker(request, response);

  // Read all speakers
  mockDao.readAll.mockReturnValue([newSpeaker]);
  await SpeakerController.readAllSpeakers(request, response);

  // Verify that the array contains the expected speaker
  console.log(mockDao.readAll)
  expect(mockDao.readAll).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledWith([newSpeaker]);
});
});
describe('deleteSpeaker', () => {
  let mockDao;
  let request;
  let response;

  beforeEach(() => {
    mockDao = {
      deleteSpeakerByID: jest.fn()
    };
    SpeakerController.setDAO(mockDao);
    request = {
      params: {
        id: 1
      }
    };
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  it('should delete the speaker with the given ID and return it in the response', async () => {
    const mockDeletedSpeaker = {
      id: 1,
      name: 'Test Speaker',
      phone: '123-456-7890',
      email: 'test@example.com',
      mailing_address: '123 Main St',
      specialty: 'Testing'
    };
    mockDao.deleteSpeakerByID.mockReturnValue(mockDeletedSpeaker);

    await SpeakerController.deleteSpeaker(request, response);

    expect(mockDao.deleteSpeakerByID).toHaveBeenCalledTimes(1);
    expect(mockDao.deleteSpeakerByID).toHaveBeenCalledWith(request.params.id);
    expect(response.status).toHaveBeenCalledWith(202);
    expect(response.send).toHaveBeenCalledWith(mockDeletedSpeaker);
  });

  it('should return a 404 status if the speaker with the given ID does not exist', async () => {
    mockDao.deleteSpeakerByID.mockReturnValue(null);

    await SpeakerController.deleteSpeaker(request, response);

    expect(mockDao.deleteSpeakerByID).toHaveBeenCalledTimes(1);
    expect(mockDao.deleteSpeakerByID).toHaveBeenCalledWith(request.params.id);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledWith(null);
  });
});

});



