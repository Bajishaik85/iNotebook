import React, { useContext, useState } from 'react'
import noteContext from '../Context/NoteContext';

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]= useState({title:"",description:"",tag:""})


    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","Success");

    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <form className='mx-auto'>
                <h2>Add a Note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id='title' name='title' className="form-control" value={note.title} onChange={onChange} />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name='description' onChange={onChange} className="form-control" value={note.description} id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name='tag' onChange={onChange} className="form-control" value={note.tag} id="tag"  />
                </div>
                
                <button disabled={note.title.length< 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </>
    )
}

export default AddNotes
