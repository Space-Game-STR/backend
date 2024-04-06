import { CommandHandler, Response } from "../../CommandHandler";
import { CelestialSchema, ICelestial } from "../schemas/Celestial";

export class Celestials {
    static async getCelestials(commandHandler: CommandHandler): Promise<Response> {
        var response;

        if (commandHandler.data.options.all) {
            response = await CelestialSchema.find({});
        }

        if (response === undefined) {
            return new Response(2, "Could not find celestials by the options/data sent.")
        }

        return new Response(1, JSON.stringify(response));
    }

    static async createCelestial(commandHandler: CommandHandler): Promise<Response> {


        //const celestial: ICelestial = 
        return new Response(3, "Not implemented yet");
    }
}