const express = require('express')
const upload = require('../helpers/uploadHelper')
const router = express.Router();
const roomController = require('../controllers/roomController');
const UserModel = require('../models/UserModel');
// const UserModel = require('../models/UserModel');
router.post('/addRoom', upload.array('files', 10), roomController.addRoom);
router.post('/tanentAds', upload.array('files', 2), roomController.tanentAds);
router.put('/updateRoom/:_id', upload.array('files', 10), roomController.updateRoom);
router.get('/find_rooms', roomController.getAllRooms);
router.get('/roommates', roomController.getAllRoommates);

router.get('/searchRoom', roomController.searchRoom);

router.get('/find_room/:_id', roomController.findSingleRoom);
router.post('/postUser', roomController.postUser);

router.get("/getUser/:uid", roomController.getUser);
router.put("/updateUser/:uid", roomController.updateUser);

router.get('/' , (req, res, next) => {
    res.json({msg: 'Welcome'})
})


module.exports = {
    routes: router,
}