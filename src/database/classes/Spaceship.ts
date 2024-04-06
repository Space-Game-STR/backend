import { CommandHandler, Response } from "../../CommandHandler";
import { ISpaceship, SpaceShipSchema } from "../schemas/Spaceship";
import { v4 as uuidv4 } from 'uuid';
import { Celestials } from "./Celestial";

const instanceOfSpaceship = (object: any): object is ISpaceship => {
    return 'name' in object && 'orbitingCelestial' in object && 'celestialOrbiting' in object && 'currentJourney' in object && 'velocity' in object;
}

export class SpaceShips {
    static async getSpaceShips(commandHandler: CommandHandler): Promise<Response> {

        var response;

        if (commandHandler.data.options.all) {
            response = await SpaceShipSchema.find({});
        }
        else if (commandHandler.data.options.uuid) {
            response = await SpaceShipSchema.find({ uuid: commandHandler.data.options.uuid });
        }

        if (response === undefined) {
            return new Response(2, "Could not find spaceships by the options/data sent.")
        }

        return new Response(1, JSON.stringify(response));
    }

    static async createSpaceShip(commandHandler: CommandHandler): Promise<Response> {

        if (!instanceOfSpaceship(commandHandler.data.object)) throw "Data does not containt a spaceship. It has to have [name, orbitingCelestial, celestialOrbiting, currentJourney, velocity]"

        const object = commandHandler.data.object;

        const celestialOrbitingExists = await Celestials.exists(object.celestialOrbiting);

        if (!celestialOrbitingExists) throw "celestialOrbiting isnt a valid celestial uuid";

        const spaceship: ISpaceship = {
            uuid: uuidv4(),
            name: object.name,
            orbitingCelestial: object.orbitingCelestial,
            celestialOrbiting: object.celestialOrbiting,
            currentJourney: object.currentJourney,
            velocity: object.velocity
        };

        const spaceshipObject = await SpaceShipSchema.create(spaceship);

        return new Response(1, JSON.stringify(spaceshipObject));
    }
}