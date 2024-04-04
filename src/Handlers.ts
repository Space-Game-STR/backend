import { CommandHandler } from "./CommandHandler"
import { Celestials } from "./database/classes/Celestial";

export const getCommand = async (commandHandler: CommandHandler) => {
    switch (commandHandler.objectType) {
        case "celestials": return await Celestials.getCelestials(commandHandler);
        default: return "ObjectType not found";
    }
}