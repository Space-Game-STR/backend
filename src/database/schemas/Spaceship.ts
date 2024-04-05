import { Schema, model } from "mongoose";

export interface ISpaceship {
    uuid: string,
    name: string,
    orbitingCelestial: boolean,
    celestialOrbiting: string,
    currentJourney: string,
    velocity: number
}

const spaceShipSchema = new Schema<ISpaceship>({
    uuid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    orbitingCelestial: {
        type: Boolean,
        required: true
    },
    celestialOrbiting: {
        type: String,
        required: true
    },
    currentJourney: {
        type: String,
        required: true
    },
    velocity: {
        type: Number,
        required: true
    }
});

export const SpaceShipSchema = model<ISpaceship>('spaceship', spaceShipSchema, 'spaceships');