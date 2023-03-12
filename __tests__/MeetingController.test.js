const MeetingController = require('../controller/MeetingController');
//const MeetingDAO = require('../model/MeetingDAO');

describe('MeetingController', () => {
  let mockDao = null;
  let request = null;
  let response = null;

  beforeEach(() => {
    mockDao = {
      create: jest.fn(),
      readAll: jest.fn(),
    };
    MeetingController.setDAO(mockDao);
    request = {
      body: {
        date: '2023-03-01',
        speaker: 'John Doe',
        topic: 'Testing Jest',
        location: 'Online',
        content: 'This is a test meeting.',
      },
    };
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe('saveMeeting', () => {
    it('should call dao.create with the new meeting object', async () => {
      await MeetingController.saveMeeting(request, response);

      expect(mockDao.create).toHaveBeenCalledTimes(1);
      expect(mockDao.create).toHaveBeenCalledWith(request.body);
    });

    it('should send the saved meeting in the response', async () => {
      const savedMeeting = { id: 1, ...request.body };
      mockDao.create.mockReturnValue(savedMeeting);

      await MeetingController.saveMeeting(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(savedMeeting);
    });
  });

  describe('readAllMeetings', () => {
    it('should call dao.readAll', async () => {
      await MeetingController.readAllMeetings(request, response);

      expect(mockDao.readAll).toHaveBeenCalledTimes(1);
    });

    it('should send all meetings in the response', async () => {
      const allMeetings = [{ id: 1, ...request.body }];
      mockDao.readAll.mockReturnValue(allMeetings);

      await MeetingController.readAllMeetings(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(allMeetings);
    });
  });
  describe('readAllMeetings', () => {
    it('should return an array containing the added meeting', async () => {
      // Save a new meeting
      const newMeeting = {
        date: '2023-03-01',
        speaker: 'John Doe',
        topic: 'Testing Jest',
        location: 'Online',
        content: 'This is a test meeting.',
      };
      mockDao.create.mockReturnValue(newMeeting);
  
      await MeetingController.saveMeeting(request, response);
  
      // Read all meetings
      mockDao.readAll.mockReturnValue([newMeeting]);
      await MeetingController.readAllMeetings(request, response);
  
      // Verify that the array contains the expected meeting
      console.log(mockDao.readAll)
      expect(mockDao.readAll).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith([newMeeting]);
    });
  });
  
});


