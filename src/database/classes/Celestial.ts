import { CommandHandler } from "../../CommandHandler";
import { CelestialSchema } from "../schemas/Celestial";

export class Celestials {
    static async getCelestials(commandHandler: CommandHandler): Promise<string> {
        const celestials = await CelestialSchema.find({});
        return JSON.stringify(celestials);
    }
}