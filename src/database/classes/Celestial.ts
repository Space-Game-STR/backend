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

        if (!instanceOfCelestial(commandHandler.data.object)) throw "Data does not contain a celestial. It has to have [radius, angle, distanceFromSun]";

        const celestial: ICelestial = {
            uuid: uuidv4(),
            angle: commandHandler.data.object.angle,
            radius: commandHandler.data.object.radius,
            distanceFromSun: commandHandler.data.object.distanceFromSun,
        };

        const celestialObject = await CelestialSchema.create(celestial);

        return new Response(1, JSON.stringify(celestialObject));
    }
}