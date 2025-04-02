import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css'; // Import your CSS file

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log('Fetched notes:', data);
            })
            .catch((err) => alert('Error fetching notes: ' + err));
    };

    const deleteNote = (id) => {
        console.log('Deleting note with ID:', id); // Debug log
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                console.log('Delete response:', res); // Debug log
                if (res.status === 204 || res.status === 200) { // Allow both 204 and 200
                    alert("Note deleted!");
                    getNotes(); // Refresh the notes list
                } else {
                    alert("Failed to delete Note. Status: " + res.status);
                }
            })
            .catch((err) => {
                console.error('Error deleting note:', err.response ? err.response.data : err.message);
                alert('Error deleting note: ' + (err.response ? err.response.data : err.message));
            });
    };

    const createNote = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form submitted with:', { title, content }); // Debug log
        api.post("/api/notes/", { content, title })
            .then((res) => {
                console.log('API response:', res); // Debug log
                if (res.status === 201) {
                    alert("Note created!");
                    setTitle(''); // Clear form
                    setContent(''); // Clear form
                    getNotes(); // Refresh notes
                } else {
                    alert("Failed to create Note");
                }
            })
            .catch((err) => {
                console.error('API error:', err.response); // Log detailed error
                alert('Error creating note: ' + err);
            });
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} key={note.id} onDelete={deleteNote} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    value={title}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    required
                    value={content}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;