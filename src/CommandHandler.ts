import { createCommand, getCommand } from "./Handlers";
import { ICelestial } from "./database/schemas/Celestial";
import { ISpaceship } from "./database/schemas/Spaceship";
import { DataOptions } from "./database/types";

export class CommandHandler {
    command: string
    objectType: string
    data: Data

    constructor(string: string) {
        const array = string.split(' ');

        if (array.length >= 1) this.command = array[0].toLowerCase();
        if (array.length >= 2) this.objectType = array[1].toLowerCase();
        if (array.length >= 3) this.data = new Data(array.slice(2).join(" "));

    }

    async handleCommand(): Promise<Response> {
        switch (this.command) {
            case 'get': return getCommand(this);
            case 'create': return createCommand(this);
            case 'update': return new Response(3, "UPDATE Command");
            case 'ping': return new Response(3, "PONG");
            default: return new Response(2, "Command not recognized");
        }
    }
}

class Data {
    object: ICelestial | ISpaceship
    options: DataOptions

    constructor(string: string) {
        const parsed = JSON.parse(string);

        if (!parsed.object) throw "Data doesnt contain an object field";
        if (!parsed.options) throw "Data doesnt contain an options field";

        this.object = parsed.object;
        this.options = parsed.options;
    }
}
// 1 -> all god
// 2 -> error
// 3 -> not implemented
export class Response {
    status: number
    statusMessage: string
    data: string

    constructor(status: number, data: string) {
        this.status = status;
        this.statusMessage = this.handleStatusMessage();
        this.data = data;
    }

    handleStatusMessage() {
        switch (this.status) {
            case 1: return "OK";
            case 2: return "ERROR";
            case 3: return "NOT IMPLEMENTED";
            default: return "STATUS NOT IMPLEMENTED";
        }
    }
}