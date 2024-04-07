import { Schema, model } from "mongoose";

export interface IJourney {
    uuid: string,
    spaceshipId: string,
    start: number,
    end: number,
    celestialStartId: string,
    celestialEndId: string
}

const journeySchema = new Schema<IJourney>({
    uuid: {
        type: String,
        required: true
    },
    spaceshipId: {
        type: String,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    celestialStartId: {
        type: String,
        required: true
    },
    celestialEndId: {
        type: String,
        required: true
    }
});

export const JourneySchema = model<IJourney>('journey', journeySchema, 'journeys');