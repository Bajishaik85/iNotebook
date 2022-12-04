const express = require('express');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const fetchuser= require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const app = express();
const router = express.Router();


const JWT_SECRET = "bajiisagood$oy"


//create a user using POST method,/api/v1/auth/createuser, no login required
router.post('/createuser', [

    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),



], async (req, res) => {
    let success= false;

    console.log(req.body);
    // const user = User(req.body);
    // user.save();

    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;

        return res.status(400).json({success, errors: errors.array() });
    }



    try {
        //check whether the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=false;

            console.log(user)
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        //adding pepper and salt for hashing the password
        const password = req.body.password;
        var salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }


        const authtoken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,authtoken})


        //.then(user => res.json(user))
        //     .catch(err => {
        //         console.log(err);
        //         res.json({ error: "Please Enter a valid email address" });
        //     })
        // res.send(user);
        // const user= user(req.body);
        // user.save();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");

    }



})

//create a login request using POST method,/api/v1/auth/login, no login required
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Shouldnot be empty').exists(),


], async (req, res) => {
    console.log(req.body);
    let success=false;

    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please Enter Correct Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"Please Enter Correct Credentials"});


        }
        const data = {
            user: {
                id: user.id
            }
        }


        const authtoken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,authtoken});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal error occured");
        
    }


})



//create a get request using POST method,/api/v1/auth/get, no login required

router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;