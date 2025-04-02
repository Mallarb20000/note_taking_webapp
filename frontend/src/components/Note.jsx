import React from 'react';
import '../styles/Note.css'; // Import your CSS file

function Note({note, onDelete}){

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    
    return (
    <div className ="note-container">
        <p className ="note-title">{note.title}</p>
        <p className ="note-content">{note.content}</p>
        <p className ="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
            Delete
        </button>
    </div>
    );
}

export default Note;