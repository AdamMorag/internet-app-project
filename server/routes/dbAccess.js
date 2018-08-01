const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uuidv4 = require('uuid/v4');
const request = require('request-promise-native');

// dbname
const dbName = 'FlowDB';

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, db) => {
    if (err) return console.log("connection error: - " + err);

    closure(db);
  });
};

function getLocations() {
  return new Promise((resolve, reject) => {
    connection((db) => {
      let dbInstance = db.db(dbName);
      dbInstance.collection('Locations')
        .find()
        .toArray()
        .then((locations) => {
          resolve(locations);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function getBoardById(boardId) {
  return new Promise((resolve, reject) => {
    connection((db) => {
      let dbInstance = db.db(dbName);
      dbInstance.collection('Boards')
        .find({
          "boardId": boardId
        })
        .toArray()
        .then((board) => {
          resolve(board[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function getBoardsUserIsShareWith(userId) {
  return new Promise((resolve, reject) => {
    connection((db) => {
      let dbInstance = db.db(dbName);
      dbInstance.collection('Boards')
        .find({
          $and: [{
            "boardMembers.uid": userId
          }, {
            "boardOwner.uid": { $ne: userId }
          }]
        })
        .toArray()
        .then((boards) => {
          resolve(boards);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function getBoardsUserIsManagerOf(userId) {
  return new Promise((resolve, reject) => {
    connection((db) => {
      let dbInstance = db.db(dbName);
      dbInstance.collection('Boards')
        .find({
          "boardOwner.uid": userId
        })
        .toArray()
        .then((boards) => {
          resolve(boards);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function getUserTasks(userId) {
  return new Promise((resolve, reject) => {
    connection((db) => {
      let dbInstance = db.db(dbName);
      dbInstance.collection('Boards')
        .find({
          $and: [{
            "boardMembers.uid": userId
          }, {
            "tasks.owner.uid": userId
          }]
        })
        .toArray()
        .then((boards) => {
          let taskArrays = boards.map(board => board.tasks.filter(task => task.owner.uid === userId));
          let result = [];
          taskArrays.forEach(element => {
            element.forEach(arr => {
              result.push(arr);
            });
          });
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

module.exports = {
  getBoardById: getBoardById,
  getLocations: getLocations,
  getBoardsUserIsShareWith: getBoardsUserIsShareWith,
  getBoardsUserIsManagerOf: getBoardsUserIsManagerOf,
  getUserTasks: getUserTasks
}