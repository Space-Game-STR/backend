import { CommandHandler } from "../../CommandHandler";
import { SpaceShipSchema } from "../schemas/Spaceship";

export class SpaceShips {
    static async getSpaceShips(commandHandler: CommandHandler): Promise<string> {
        const spaceships = await SpaceShipSchema.find({});
        return JSON.stringify(spaceships);
    }
}