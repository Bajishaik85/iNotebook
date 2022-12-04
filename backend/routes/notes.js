const express = require('express');
const mongoose = require('mongoose');
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const router = express.Router();


// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Get All the Notes using: GET "/api/notes/getuser". Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charecters').isLength({ min: 5 }),
], async (req, res) => {

    const { title, description, tag } = req.body;

    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }


})

// ROUTE 3: Update the notes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {}
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    //find the note to be updated and update it
    // const note = findIdByAndUpdate()
    let note =await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not found");

    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");


    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
})

// ROUTE 4: delete the notes
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //find the note to be delete and delete it
    let note =await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not found");

    }
    //allow deletion only if user owns this notes
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");


    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted",note:note });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }

    
})
module.exports = router;
