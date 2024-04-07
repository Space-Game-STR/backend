import { CommandHandler, Response } from "../../CommandHandler";
import { CelestialSchema } from "../schemas/Celestial";
import { IJourney, JourneySchema } from "../schemas/Journey"
import { SpaceShipSchema } from "../schemas/Spaceship";
import { Celestials } from "./Celestial";
import { v4 as uuidv4 } from 'uuid';

const instanceOfNewJourney = (object: any): object is IJourney => {
    return 'spaceshipId' in object && 'celestialEndId' in object;
}

export class Journeys {
    static async getEndedJourneys(): Promise<Array<IJourney>> {
        let currentMillis = Date.now();
        const journeys = await JourneySchema.find({ end: { $lt: currentMillis } });

        return journeys;
    }

    static async removeEndedJourneys(journeys: Array<IJourney>): Promise<true> {
        const ids = journeys.map(j => j.uuid);

        await JourneySchema.deleteMany({ uuid: { $in: ids } });

        return true;
    }

    static async getJourneys(commandHandler: CommandHandler): Promise<Response> {
        var response;
        if (commandHandler.data.options.all) {
            response = await JourneySchema.find({});
        } else if (commandHandler.data.options.uuid) {
            response = await JourneySchema.find({ uuid: commandHandler.data.options.uuid });
        } else {
            return new Response(2, "Could not find journeys by the options/data sent.");
        }

        return new Response(1, JSON.stringify(response));
    }

    static async createNewJourney(commandHandler: CommandHandler): Promise<Response> {
        if (!instanceOfNewJourney(commandHandler.data.object)) throw "Data does not contain a new Journey. It has to have [spaceshipId, celestialEndId]";

        const newJourney = commandHandler.data.object;

        const endCelestial = await CelestialSchema.findOne({ uuid: newJourney.celestialEndId });
        if (!endCelestial) throw "Celestial for new journey does not exist";

        const spaceship = await SpaceShipSchema.findOne({ uuid: newJourney.spaceshipId });
        if (!spaceship) throw "Spaceship does not exist";

        const distance = await Celestials.distanceBetweenCelestials(spaceship.celestialOrbiting, newJourney.celestialEndId);

        newJourney.uuid = uuidv4();
        newJourney.celestialStartId = spaceship.celestialOrbiting;
        newJourney.start = Date.now();
        newJourney.end = Date.now() + (distance / spaceship.velocity) * 1000;

        await JourneySchema.create(newJourney);

        spaceship.currentJourney = newJourney.uuid;
        await spaceship.save();

        return new Response(1, JSON.stringify(newJourney));
    }
}