import { CommandHandler, Response } from "../../CommandHandler";
import { SpaceShipSchema } from "../schemas/Spaceship";

export class SpaceShips {
    static async getSpaceShips(commandHandler: CommandHandler): Promise<Response> {
        const spaceships = await SpaceShipSchema.find({});

        return new Response(1, JSON.stringify(spaceships));
    }
}