const dbcon = require('../model/DBConnection');

beforeAll(async function(){
    dbcon.connect('test'); // connect to the test database
    await deleteAll();
});

afterAll(async function(){
    await deleteAll(); // delete all speakers from the test database
    dbcon.disconnect(); // disconnect from the test database
});

const mongoose = require('mongoose');
const assert = require('assert');
const { create, readAll, deleteAll, updateSpeaker,deleteSpeakerByID } = require('../model/SpeakerDAO');

// Set up a connection to a test database

// Clear the test database before each test
afterEach(async function() {
    await deleteAll();
});

describe('DAO tests', function() {
    describe('create function', function() {
        it('should create a new speaker', async function() {
            const newSpeaker = {
                name: 'Test Speaker',
                phone: '123-456-7890',
                email: 'test@example.com',
                mailing_address: '123 Main St',
                specialty: 'Testing'
            };
            const createdSpeaker = await create(newSpeaker);
            assert.strictEqual(createdSpeaker.name, newSpeaker.name);
            assert.strictEqual(createdSpeaker.phone, newSpeaker.phone);
            assert.strictEqual(createdSpeaker.email, newSpeaker.email);
            assert.strictEqual(createdSpeaker.mailing_address, newSpeaker.mailing_address);
            assert.strictEqual(createdSpeaker.specialty, newSpeaker.specialty);
        });

        it('should not create a new speaker with duplicate email', async function() {
            const newSpeaker1 = {
                name: 'Test Speaker 1',
                phone: '123-456-7890',
                email: 'test@example.com',
                mailing_address: '123 Main St',
                specialty: 'Testing'
            };
            const newSpeaker2 = {
                name: 'Test Speaker 2',
                phone: '987-654-3210',
                email: 'test@example.com',
                mailing_address: '456 Second St',
                specialty: 'Testing'
            };
            await create(newSpeaker1);
            const createdSpeaker = await create(newSpeaker2);
            assert.strictEqual(createdSpeaker, null);
        });
    });

    describe('readAll function', function() {
        // it('should return all speakers', async function() {
            // const newSpeaker1 = {
            //     name: 'Test Speaker 1',
            //     phone: '123-456-7890',
            //     email: 'test1@example.com',
            //     mailing_address: '123 Main St',
            //     specialty: 'Testing'
            // };
        //     const newSpeaker2 = {
        //         name: 'Test Speaker 2',
        //         phone: '987-654-3210',
        //         email: 'test2@example.com',
        //         mailing_address: '456 Second St',
        //         specialty: 'test_smith'
        //     };
        //     await create(newSpeaker1);
        //     await create(newSpeaker2);
        //     const allSpeakers = await readAll();
        //     console.log(allSpeakers)
        //     assert.strictEqual(allSpeakers.length, 2);
        //     assert.strictEqual(allSpeakers[0].name, newSpeaker1.name);
        //     assert.strictEqual(allSpeakers[1].name, newSpeaker2.name);
        // });

        it('should return an empty array if no speakers exist', async function() {
            const allSpeakers = await readAll();
            assert.deepStrictEqual(allSpeakers, []);
        });
    });

    describe('deleteAll function', function() {
        it('should delete all speakers', async function() {
            const newSpeaker1 = {
                name: 'Test Speaker 1',
                phone: '123-456-7890',
                email: 'test1@example.com',
                mailing_address: '123 Main St',
                specialty: 'Testing'
            };
            const newSpeaker2 = {
                name: 'Test Speaker 2',
                phone: '987-654-3210',
                email: 'test2@example.com',
                mailing_address: '456 Second St',
                specialty: 'Testing'
            };
await create(newSpeaker1);
await create(newSpeaker2);
await deleteAll();
const allSpeakers = await readAll();
assert.deepStrictEqual(allSpeakers, []);
});
});
describe('updateSpeaker function', function() {
    it('should update an existing speaker', async function() {
      const newSpeaker = {
        name: 'Test Speaker',
        phone: '123-456-7890',
        email: 'test@example.com',
        mailing_address: '123 Main St',
        specialty: 'Testing'
      };
      const createdSpeaker = await create(newSpeaker);
      const updatedSpeaker = {
        _id: createdSpeaker._id,
        name: 'Updated Test Speaker',
        phone: '555-555-5555',
        email: 'updated_test@example.com',
        mailing_address: '456 Second St',
        specialty: 'Updated Testing'
      };
      const editedSpeaker = await updateSpeaker(updatedSpeaker);
      assert.strictEqual(editedSpeaker.name, updatedSpeaker.name);
      assert.strictEqual(editedSpeaker.phone, updatedSpeaker.phone);
      assert.strictEqual(editedSpeaker.email, updatedSpeaker.email);
      assert.strictEqual(editedSpeaker.mailing_address, updatedSpeaker.mailing_address);
      assert.strictEqual(editedSpeaker.specialty, updatedSpeaker.specialty);
    });
  
    it('should return null if the speaker does not exist', async function() {
      const updatedSpeaker = {
        _id: mongoose.Types.ObjectId(),
        name: 'Updated Test Speaker',
        phone: '555-555-5555',
        email: 'updated_test@example.com',
        mailing_address: '456 Second St',
        specialty: 'Updated Testing'
      };
      const editedSpeaker = await updateSpeaker(updatedSpeaker);
      assert.strictEqual(editedSpeaker, null);
    });
  });
  describe('deleteSpeakerByID function', function() {
    it('should delete a speaker by ID', async function() {
      // Create a new speaker
      const newSpeaker = {
        name: 'Test Speaker',
        phone: '123-456-7890',
        email: 'test@example.com',
        mailing_address: '123 Main St',
        specialty: 'Testing'
      };
      const createdSpeaker = await create(newSpeaker);
      // Delete the speaker by ID
      await deleteSpeakerByID(createdSpeaker._id);
      // Verify that the speaker has been deleted
      const allSpeakers = await readAll();
      assert.deepStrictEqual(allSpeakers, []);
    });
    it('should return null if no speaker is found with the given ID', async function() {
      const deletedSpeaker = await deleteSpeakerByID(mongoose.Types.ObjectId());
      assert.strictEqual(deletedSpeaker, null);
    });
  });



});






