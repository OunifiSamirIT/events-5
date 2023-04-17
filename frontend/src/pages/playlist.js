import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { Button, Form, Input, Label } from 'reactstrap';
import D from "./e.jpg";

function AddPlaylist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mp3, setMp3] = useState(null);

  const [mp3Files, setMp3Files] = useState([]);

  useEffect(() => {
    const fetchMp3Files = async () => {
      try {
        const response = await axios.get('/api/playlists');
        setMp3Files(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMp3Files();
  }, []);








  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('mp3', mp3);

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setMp3(event.target.files[0]);
  };
  const path = require('path');

  return (
    <div>
    <div className="container mx-auto mt-8 " style={{marginTop:10}}>
      <div className="bg-white rounded-lg shadow-lg p-2">
        <h1 className="text-2xl font-bold mb-4">Add Playlist</h1>
        <Form onSubmit={handleSubmit}>
          <div style={{width:700}}>
            <Label htmlFor="title" className="block font-bold mb-2">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <br></br>
          <div className="mb-4">
            <Label htmlFor="description" className="block font-bold mb-2">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div style={{width:700}}>
            <Label htmlFor="mp3" className="block font-bold mb-2">MP3 File</Label>
            <Input
              type="file"
              id="mp3"
              onChange={handleFileChange}
              className="w-full"
              accept=".mp3"
              required
            />
          </div>
          <Button
            type="submit"
            className="primary"
          >
            Add Playlist
          </Button>
        </Form>
      </div>


      <div className="container" style={{marginTop:50,width:400,marginBottom:200,   boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 0, 0, 0.1)'}}>
      <h1> Playlist</h1>
      <div className="shadow-box">
        {/* Render a grid of mp3 files */}
        <div className="grid">
          {mp3Files.map((mp3File) => (
            <div key={mp3File._id} className="mp3-file">
              <div className="mp3-file-image">
                <img src={D} alt={mp3File.title} style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="mp3-file-details">
                <h3>{mp3File.title}</h3>
                <p>{mp3File.description}</p>
              </div>
              <div className="mp3-file-player">
              <audio controls>
    <source
      src={`http://localhost:3600/uploads/${path.basename(mp3File.mp3)}`}
      type="audio/mp3"
    />
    Your browser does not support the audio element.
  </audio>
              </div>
            </div>
          ))}
        </div>
        {/* Add the form to upload an mp3 file here */}
      </div>
    </div>










    </div></div>
  );
}

export default AddPlaylist;
