import { CommandHandler, Response } from "../../CommandHandler";
import { IJourney, JourneySchema } from "../schemas/Journey"

export class Journeys {
    static async getEndedJourneys(): Promise<Array<IJourney>> {
        let currentMillis = Date.now();
        const journeys = await JourneySchema.find({ end: { $lt: currentMillis } });

        return journeys;
    }

    static async removeEndedJourneys(journeys: Array<IJourney>): Promise<true> {
        const ids = journeys.map(j => j.uuid);

        await JourneySchema.deleteMany({ uuid: { $in: ids } });

        return true;
    }

    static async getJourneys(commandHandler: CommandHandler): Promise<Response> {
        var response;
        if(commandHandler.data.options.all) {
            response = await JourneySchema.find({});
        } else if (commandHandler.data.options.uuid) {
            response = await JourneySchema.find({uuid: commandHandler.data.options.uuid});
        } else {
            return new Response(2, "Could not find journeys by the options/data sent.");
        }

        return new Response(1, JSON.stringify(response));
    }
}