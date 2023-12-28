const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para manejar JSON.

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/musicDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Esquema de canción
const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number
});

// Modelo de canción
const Song = mongoose.model('Song', songSchema);

// Rutas
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/songs', async (req, res) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year
    });

    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
