const SpeakerController = require('../controller/SpeakerController');
//const SpeakerDAO = require('../model/SpeakerDAO');

describe('SpeakerController', () => {
let mockDao = null;
let request = null;
let response = null;

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

});



