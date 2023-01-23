const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const authController = {}

authController.register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            res.status(404).send({ message: "Email already exist!" })
        }
        else {
            const encryptePass = await bcrypt.hash(req.body.password, 10)
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: encryptePass,
            }
            const user = new User(newUser)
            await user.save()
            res.status(200).send('User successfully sign up!')
            // res.status(200).send(encryptePass)
        }
        // console.log(existingUser);

    } catch (e) {
        res.status(200).send(e.message)

    }

}

authController.login = (req, res, next) => {
    User.findOne({ email: req.body.email })

        .then((data) => {
            // compare the password entered and the hashed password found

            bcrypt
                .compare(req.body.password, data.password)

                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match",
                            data: null,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            user: {
                                id: data._id,
                                name: data.name,
                                email: data.email,
                                isAdmin: data.isAdmin,
                            },
                        },
                        `RENTERBDDOTCOM`,
                        { expiresIn: '1h' }
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        token,
                    });
                })
                // catch error if password do not match
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Email not found",
                e,
            });
            console.log(e);
        });
};

authController.verifyJWT = async (req, res, next) => {
    try {
        const decode = await jwt.verify(req.body.jwt, 'RENTERBDDOTCOM');
        res.status(403).send(decode)
        // console.log(data)
    } catch (e) {
        res.status(401).send('User unauthorized')
    }
}
module.exports = authController