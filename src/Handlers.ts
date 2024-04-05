import { CommandHandler } from "./CommandHandler"
import { Celestials } from "./database/classes/Celestial";
import { SpaceShips } from "./database/classes/Spaceship";

export const getCommand = async (commandHandler: CommandHandler) => {
    switch (commandHandler.objectType) {
        case "celestials": return await Celestials.getCelestials(commandHandler);
        case "spaceships": return await SpaceShips.getSpaceShips(commandHandler);
        default: return "ObjectType not found";
    }
}