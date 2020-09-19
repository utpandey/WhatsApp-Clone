import express from "express";
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origins", '*');
//     res.setHeader("Access-Control-Allow-Headers", '*');
//     next();
// })

const pusher = new Pusher({
    appId: '1072680',
    key: '486dce3f7f3b9ae6871f',
    secret: 'f17c176c81d33642624b',
    cluster: 'ap2',
    encrypted: true
});


const connection__url = 'mongodb+srv://admin:10Str@whats@cluster0.zlrlf.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection__url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB CONN');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('Error triggering Pusher');
        }
    })
})

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

app.listen(port, () => console.log(`Listening at ${port}`))