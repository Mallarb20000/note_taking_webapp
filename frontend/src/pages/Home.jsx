import {useState, useEffect} from 'react';
import api from '../api';


function Home(){
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
           .get("/api/notes/")
           .then((res) => res.data )
           .then((data) => {setNotes(data);console.log(data);})
           .catch((err)=>alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status ===204) alert("Note deleted!");
            else alert ("Failed to delete Note");
        
         })
            .catch((err) => alert(err));
        getNotes();

    }

    const createNote = () => {
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then(res => {
            if (res.status === 201) alert("Note created!");
            else alert("Failed to create Note");
        }).catch(err => alert(err));
        getNotes();
        

    

    return <div>
        <div>
            <h2>Notes</h2>
        </div>
        <h2>Create a Note</h2> 
        <form onSubmit ={createNote}>
            <lable htmlfor ="title">Title:</lable>
            <br/>
            <input 
                type ="text" 
                id="title" 
                name="title" 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                value = {title}/>
            <label htmlFor ="content">Content;</label>
            <br />
            <textarea 
                id="content" 
                name="content" 
                onChange={(e) => setContent(e.target.value)} 
                required 
                value = {content}/>
            <br/>
            <input type ="submit" value="Create Note"/>
        </form>
    </div>
}

export default Home;