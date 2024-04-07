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

    static async exists(uuid: string): Promise<boolean> {
        const exists = await CelestialSchema.find({ uuid });

        return exists.length == 1;
    }

    static async distanceBetweenCelestials(c1: string, c2: string): Promise<number> {
        const celestial1 = await CelestialSchema.findOne({uuid: c1});
        if(!celestial1) throw "Celestial does not exist";

        const celestial2 = await CelestialSchema.findOne({uuid: c2});
        if(!celestial2) throw "Celestial does not exist";

        const x1 = celestial1.distanceFromSun *  Math.cos(celestial1.angle);
        const y1 = celestial1.distanceFromSun *  Math.sin(celestial1.angle);

        const x2 = celestial2.distanceFromSun *  Math.cos(celestial1.angle);
        const y2 = celestial2.distanceFromSun *  Math.sin(celestial1.angle);

        const a = x1 - x2;
        const b = y1 - y2;

        return Math.hypot(a, b);
    }
}