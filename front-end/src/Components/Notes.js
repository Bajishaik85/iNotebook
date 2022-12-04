import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/NoteContext';
import { useNavigate } from "react-router-dom";
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
const Notes = (props) => {
    const context = useContext(noteContext);
    const [note, setNote,] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        }
        else {
            navigate('/signup');
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const ref = useRef("null");
    const refClose = useRef(null)


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "Success");


    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }

    return (
        <>
            <AddNotes showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='mx-auto'>
                                <h3>Want to edit a Note</h3>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" name='edescription' onChange={onChange} className="form-control" id="edescription" value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" name='etag' onChange={onChange} className="form-control" id="etag" value={note.etag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row m-3'>
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.lenght === 0 && "No notes to Display"}

                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                    })
                }
            </div>

        </>
    )
}

export default Notes
