const Playlist = require('../models/Playlist');
const multer = require('multer');
const path = require('path');

// configure multer to specify the destination directory for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// create an instance of the multer object with the specified configuration
const upload = multer({ storage: storage });

exports.createPlaylist = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single('mp3')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          reject({ status: 400, message: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          reject({ status: 500, message: err.message });
        } else {
          // Everything went fine.
          resolve();
        }
      });
    });

    const playlist = new Playlist({
      title: req.body.title,
      description: req.body.description,
      mp3: path.basename(req.file.path)
    });

    const newPlaylist = await playlist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.createPlaylist = async (req, res) => {
//   const playlist = new Playlist({
//     title: req.body.title,
//     description: req.body.description,
//     songs: req.body.songs
//   });

//   try {
//     const newPlaylist = await playlist.save();
//     res.status(201).json(newPlaylist);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (req.body.title) playlist.title = req.body.title;
    if (req.body.description) playlist.description = req.body.description;
    if (req.body.songs) playlist.songs = req.body.songs;
    const updatedPlaylist = await playlist.save();
    res.json(updatedPlaylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};