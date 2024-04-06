import { CommandHandler, Response } from "../../CommandHandler";
import { CelestialSchema, ICelestial } from "../schemas/Celestial";
import { v4 as uuidv4 } from 'uuid';

const instanceOfCelestial = (object: any): object is ICelestial => {
    return 'radius' in object && 'angle' in object && 'distanceFromSun' in object;
}

export class Celestials {
    static async getCelestials(commandHandler: CommandHandler): Promise<Response> {
        var response;

        if (commandHandler.data.options.all) {
            response = await CelestialSchema.find({});
        }

        if (!commandHandler.data.options.all && commandHandler.data.options.uuid) {
            response = await CelestialSchema.findOne({ uuid: commandHandler.data.options.uuid });
        }

        if (response === undefined) {
            return new Response(2, "Could not find celestials by the options/data sent.")
        }

        return new Response(1, JSON.stringify(response));
    }

    static async createCelestial(commandHandler: CommandHandler): Promise<Response> {

        if (!instanceOfCelestial(commandHandler.data)) throw "Data does not contain a celestial";

        const celestial: ICelestial = {
            uuid: uuidv4(),
            angle: commandHandler.data.angle,
            radius: commandHandler.data.radius,
            distanceFromSun: commandHandler.data.distanceFromSun,
        };

        const celestialObject = await CelestialSchema.create(celestial);

        return new Response(1, JSON.stringify(celestialObject));
    }
}