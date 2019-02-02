let AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
let rek = new AWS.Rekognition();
const collectionId = process.argv[2] + 'FaceCollection';

let listFaceCollection = () => rek.listCollections().promise();

let deleteFaceCollection = data => data.CollectionIds.includes(collectionId) ? rek.deleteCollection({ CollectionId: collectionId }).promise() : Promise.resolve();

let createFaceCollection = () => rek.createCollection({ CollectionId: collectionId }).promise();

if (require.main === module)
    listFaceCollection().then(deleteFaceCollection).then(createFaceCollection).catch(err => { throw new Error(err) });
