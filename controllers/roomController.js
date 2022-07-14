let AdddRoom = require('../models/AddRoom');
const UserModel = require('../models/UserModel');
const { unlink } = require('fs')
const path = require('path');
const TanentAds = require('../models/TanentAds');


const roomController = {};
roomController.basedir = path.join(__dirname, '../uploads/');

function dataObject(req) {
    const body = req.body;
    const amenities = body.amenities.map(json => JSON.parse(json))
    const utilities = body.utilities.map(json => JSON.parse(json))

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/uploads/' + req.files[i].filename);
    }

    let amenityList = [];
    amenities.forEach(element => {
        amenityList.push(element)
    });
    let utilityList = [];
    utilities.forEach(element => {
        utilityList.push(element)
    });

    return {
        title: body.title,
        description: body.description,
        region: body.region,
        city: body.city,
        state: body.state,
        zip: body.zip,
        rent: body.rent,
        deposit: body.deposit,
        date: new Date(`${body.date}`).toLocaleDateString(),
        houseType: body.roomType,
        room: body.room,
        bed: body.bed,
        bath: body.bath,
        minStay: body.minStay,
        maxStay: body.maxStay,
        amenities: amenityList,
        utilities: utilityList,
        img_collection: reqFiles,
    }
}
// Room ads.
roomController.addRoom = async (req, res, next) => {
    try {

        const newRoomData = dataObject(req)
        const room = new AdddRoom(newRoomData)

        await room.save();
        res.status(200).send("Room successfully added")
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}
// Tanent Ads.
roomController.tanentAds = async (req, res, next) => {
    try {

        const newRoomData = dataObject(req)
        const tanent = new TanentAds(newRoomData)

        await tanent.save();
        res.status(200).send("Tanent ads. successfully added")
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

// Update Single Room
roomController.updateRoom = async (req, res, next) => {
    const id = req.params._id;
    const ads = await AdddRoom.findById({ _id: id })

    try {
        const updateData = dataObject(req)
        if (ads.img_collection) {
            ads.img_collection.forEach(imgUrl => {
                const url = imgUrl.replace('http://localhost:5000/uploads/', '')
                unlink(`${roomController.basedir}/${url}`, (err) => {
                    if (err) throw err;
                    else {
                        console.log(`${url} was deleted`);

                    }
                });
            })
            const updateData = dataObject(req)
            AdddRoom.findByIdAndUpdate(id, updateData,
                function (err, docs) {
                    if (err) {
                        res.status(500).send(`There was a problem while updating room find ads.`)
                        throw err
                    }
                    else {
                        console.log("Room ads. updated!");
                        res.status(200).send('Room Ads. successfully updated!')
                    }
                });
        }

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

roomController.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await AdddRoom.find();
        res.status(200).send(rooms);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// * Get All Roommates
roomController.getAllRoommates = async (req, res, next) => {
    try {
        const roommates = await TanentAds.find();
        res.status(200).send(roommates);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//* Search Room
roomController.searchRoom = async (req, res, next) => {
    try {
        const findout = await AdddRoom.find({
            "state": { $regex: req.query.keyword },
            "date": { $gte: req.query.dateFrom, $lte: req.query.dateTo },
            "rent": { $lte: req.query.maxRent },
        })
        res.status(200).send(findout)
    } catch (e) {
        res.status(400).send(e.message);
    }
}
roomController.findSingleRoom = async (req, res, next) => {
    try {
        const rooms = await AdddRoom.findById({ _id: req.params._id });
        res.status(200).send(rooms);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

roomController.postUser = async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User successfully saved",
            data: req.body
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "There was a server side error"
        })
    }
}

// GET All user
roomController.getUser = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({ uid: req.params.uid })
        if (!user)
            return res.status('404').json({
                error: "User not found"
            })

        res.status(200).json({ success: true, data: user })

        // next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}
// update user 
roomController.updateUser = async (req, res, next) => {
    console.log(req.body)
    try {

        UserModel.updateOne({ uid: req.params.uid }, req.body, { upsert: true },
            function (err, docs) {
                if (err) {
                    res.status(500).send(`There was a problem while updating user data`)
                    // throw err
                }
                else {
                    console.log("User updated!");
                    res.status(200).send('User successfully updated!')
                }
            });


    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

module.exports = roomController;