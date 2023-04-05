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
      getPastMeetings: jest.fn(),
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
    describe('readPastMeetings', () => {
      it('should call dao.getPastMeetings', async () => {
        await MeetingController.readPastMeetings(request, response);
    
        expect(mockDao.getPastMeetings).toHaveBeenCalledTimes(1);
      });
    
      it('should send all past meetings in the response', async () => {
        const pastMeetings = [{ id: 1, ...request.body }];
        mockDao.getPastMeetings.mockReturnValue(pastMeetings);
    
        await MeetingController.readPastMeetings(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith(pastMeetings);
      });
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


  describe('deleteMeeting', () => {
    it('should call dao.deleteMeeting with the meeting ID', async () => {
      const meetingID = '6418e67eb4803b6450bba029';
      const mockDeleteMeeting = jest.fn();
      mockDao.deleteMeeting = mockDeleteMeeting;
  
      await MeetingController.deleteMeeting({ params: { id: meetingID } }, response);
  
      expect(mockDeleteMeeting).toHaveBeenCalledTimes(1);
      expect(mockDeleteMeeting).toHaveBeenCalledWith(meetingID);
    });
  
    it('should send a 204 status code and a response body with id on successful deletion', async () => {
      const meetingID = '6418e67eb4803b6450bba029';
      const mockDeleteMeeting = jest.fn();
      mockDao.deleteMeeting = mockDeleteMeeting;
  
      await MeetingController.deleteMeeting({ params: { id: meetingID } }, response);
  
      expect(response.status).toHaveBeenCalledWith(204);
      expect(response.send).toHaveBeenCalledWith(`Meeting with id ${meetingID} has been deleted.`);
    });
  
    it('should send a 500 status code and an error message on deletion failure', async () => {
      const meetingID = '6418e67eb4803b6450bba029';
      const errorMessage = 'Failed to delete meeting';
      const mockDeleteMeeting = jest.fn().mockRejectedValue(new Error(errorMessage));
      mockDao.deleteMeeting = mockDeleteMeeting;
  
      await MeetingController.deleteMeeting({ params: { id: meetingID } }, response);
  
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith({ error: errorMessage });
    });
    it('should call dao.delete with the meeting id', async () => {
        const meetingId = 1;
        request.params = { id: meetingId };
        
        await MeetingController.deleteMeeting(request, response);
    
        expect(mockDao.delete).toHaveBeenCalledTimes(1);
        expect(mockDao.delete).toHaveBeenCalledWith(meetingId);
      });
    
      it('should send a success message in the response', async () => {
        const meetingId = 1;
        request.params = { id: meetingId };
        mockDao.delete.mockReturnValue(1);
    
        await MeetingController.deleteMeeting(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith(`Meeting with id ${meetingId} has been deleted.`);
      });
      
      it('should return a 404 error if the meeting is not found', async () => {
        const meetingId = 1;
        request.params = { id: meetingId };
        mockDao.delete.mockReturnValue(0);
    
        await MeetingController.deleteMeeting(request, response);
    
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.send).toHaveBeenCalledWith(`Meeting with id ${meetingId} not found.`);
      });
    });
    
  });



