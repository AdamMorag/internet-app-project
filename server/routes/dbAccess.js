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

function getBoardById (boardId) {
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

module.exports = {
    getBoardById: getBoardById
}