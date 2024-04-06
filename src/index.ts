import { createServer } from 'net';
import mongoose from 'mongoose';
import { CommandHandler } from './CommandHandler';

const port = 7070;
const host = '127.0.0.1';

const server = createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
    connectDatabase();
});

const connectDatabase = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017/SpaceGame').then(() => {
        console.log("Connected to the DB");
    }).catch((e) => {
        console.log(e);
    })
}

server.on('connection', (sock) => {
    console.log("CONNECTED: " + sock.remoteAddress + ':' + sock.remotePort);

    sock.on('data', async (data) => {
        console.log(sock.remoteAddress + ": " + data);
        try {
            const commandHandler = new CommandHandler(String(data));
            const response = await commandHandler.handleCommand();
            const responseString = JSON.stringify(response);
            sock.write(responseString);
        } catch (e) {
            if (typeof e === "string") sock.write(e);
            else console.error(e);
        }

        sock.end();
    });

    sock.on('close', (hadError) => {
        if (hadError) {
            console.warn("Socket with ip " + sock.remoteAddress + ' closed the connection with an error');
        }

        console.log(`Socket with ip ${sock.remoteAddress} closed the connection`);
    })
})