#!/usr/bin/env ts-node

import { Socket } from 'net';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const host = '127.0.0.1';
const port = 7070;
const client = new Socket();

const optionsMenu = () => {
    console.log("--- OPTIONS ---");
    console.log("0.- ping");
    console.log("1.- get all celestials");
    console.log("2.- get all spaceships");
    console.log("3.- get all spaceships of celestial");
    console.log("4.- get all journeys");
    console.log("5.- create journey");
    console.log("6.- create new celestial");
    console.log("7.- create new spaceship");
    console.log("8.- exit");
}

const queryBackend = async (query: string): Promise<boolean> => {
    client.removeAllListeners();
    return new Promise((resolve, reject) => {
        client.connect(port, host, () => {
            console.log("Connected to server");

            client.write(query);
        });

        client.on('data', (data) => {
            console.log(String(data));
            resolve(true);
        });

        client.on("error", (error) => {
            console.error(error);
            resolve(false);
        });

        client.on("close", (hadError) => {
            client.end();
            resolve(false);
        })
    })
}

const askForInput = () => {
    optionsMenu();
    rl.question("", async (input) => {
        switch (input) {
            case '0': await queryBackend('ping'); break;
            case '1': await queryBackend('get celestials {"object": {}, "options": {"all": true}}'); break;
            case '2': await queryBackend('get spaceships {"object": {}, "options": {"all": true}}'); break;
            case '3': await queryBackend('get spaceships {"object": {}, "options": {"all": false, "fromPlanet": true, "uuid": "caef83aa-ca14-4bb0-9026-955a1d494532"}}'); break;
            case '4': await queryBackend('get journeys {"object": {}, "options": {"all": true }}'); break;
            case '5': await queryBackend('create journeys {"object": {"spaceshipId": "39725e6f-e69f-40b1-836e-818e2277758f", "celestialEndId": "2d8342a7-e4e0-4322-a178-3c70b0e73e26"}, "options": {}}'); break;
            case '6': await queryBackend('create celestial {"object": {"radius": 1, "distanceFromSun": 10, "angle": 278}, "options": {}}'); break;
            case '7': await queryBackend('create spaceship {"object": {"name": "GUH", "orbitingCelestial": true, "celestialOrbiting": "caef83aa-ca14-4bb0-9026-955a1d494532", "currentJourney": "", "velocity": 1}, "options": {}}'); break;
            case '8': return rl.close();
        }
        askForInput();
    });
}

askForInput();