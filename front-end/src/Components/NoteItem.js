import React, { useContext } from 'react'
import noteContext from '../Context/NoteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className="card col-md-3 m-2 mx-auto" >
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can ms-2 me-3" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted Successfully", "Success");
                        }}></i>
                        <i className="fa-regular fa-pen-to-square" onClick={() => { updateNote(note); }}></i>

                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}

export default NoteItem
