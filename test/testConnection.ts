#!/usr/bin/env ts-node

import { Socket } from 'net';

const host = '127.0.0.1';
const port = 7070;
const client = new Socket();

client.connect(port, host, () => {
    console.log("Connected to server");

    client.write('get celestials {}');
});

client.on('data', (data) => {
    console.log(String(data));
})