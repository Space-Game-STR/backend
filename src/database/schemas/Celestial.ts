import { Schema, model } from "mongoose"

export interface ICelestial {
    uuid?: string,
    radius: number,
    angle: number,
    distanceFromSun: number
}

const celestialSchema = new Schema<ICelestial>({
    uuid: {
        type: String,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    angle: {
        type: Number,
        required: true
    },
    distanceFromSun: {
        type: Number,
        required: true
    }
});

export const CelestialSchema = model<ICelestial>('celestial', celestialSchema, 'celestials');