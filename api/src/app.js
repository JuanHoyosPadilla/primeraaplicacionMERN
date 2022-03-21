const express = require('express');
const cors = require('cors')
const app = express();

const Notas = require('./models/notes');

//configuracion para resivir json 
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//rutas 
app.get('/', async (req, res) => {
    const noteDB = await Notas.find()
    res.json({noteDB})
});

app.post('/newNota', async (req, res) => {
    const body = req.body;
    const newNota = await Notas(body);
    newNota.save((err, notadb) => {
        if(err){
            res.json({err})
        }
        res.json({
            mesage: "Note succes",
            notadb
        })
    })
});

app.put('/editNota/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const noteupdate = await Notas.findByIdAndUpdate(id, body, {new:true})

    res.json({
        mesage: "Note update",
        noteupdate
    })

})

app.delete('/deleteNota/:id', async (req, res) => {
    const id = req.params.id;
    await Notas.findByIdAndDelete(id)
    res.json({
        "Messages": "Note delete"
    })
})

module.exports = app;