import { CommandHandler, Response } from "./CommandHandler"
import { Celestials } from "./database/classes/Celestial";
import { Journeys } from "./database/classes/Journey";
import { SpaceShips } from "./database/classes/Spaceship";

export const getCommand = async (commandHandler: CommandHandler): Promise<Response> => {
    switch (commandHandler.objectType) {
        case "celestials": return await Celestials.getCelestials(commandHandler);
        case "spaceships": return await SpaceShips.getSpaceShips(commandHandler);
        case "journeys": return await Journeys.getJourneys(commandHandler);
        default: return new Response(2, "ObjectType not found");
    }
}

export const createCommand = async (commandHandler: CommandHandler): Promise<Response> => {
    switch (commandHandler.objectType) {
        case "celestial": return await Celestials.createCelestial(commandHandler);
        case "spaceship": return await SpaceShips.createSpaceShip(commandHandler);
        case "journeys": return await Journeys.createNewJourney(commandHandler);
        default: return new Response(2, "ObjectType not found");
    }
}