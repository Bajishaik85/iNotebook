import React, { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [
        // {
        //     "_id": "6371f9b0cfc9d9a74ce834517",
        //     "user": "637b4f9d16ab1ed1eafcdfca",
        //     "title": "My Title",
        //     "description": "Wake up early",
        //     "tag": "Personal",
        //     "data": "2022-11-24T16:25:48.943Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "6137f9b0cfc9d9a74ce834517",
        //     "user": "637b4f9d16ab1ed1eafcdfca",
        //     "title": "My Title",
        //     "description": "Wake up early",
        //     "tag": "Personal",
        //     "data": "2022-11-24T16:25:48.943Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "6317f9b0cfc9d9a74ce834517",
        //     "user": "637b4f9d16ab1ed1eafcdfca",
        //     "title": "My Title",
        //     "description": "Wake up early",
        //     "tag": "Personal",
        //     "data": "2022-11-24T16:25:48.943Z",
        //     "__v": 0
        // }
    ]
    const [notes, setnotes] = useState(notesInitial)



    //fetch note
    const getNotes = async () => {
        //making a api call
        const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")

            },
        });
        const json = await response.json();
        setnotes(json)

    }



    //add note
    const addNote = async (title, description, tag) => {
        //making a api call
        const response = await fetch(`${host}/api/v1/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")

            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    }



    //delete note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/v1/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")

            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes);

    }

    //edit note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/v1/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }
    return (
        <noteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )

}


export default NoteState;