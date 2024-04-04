import { getCommand } from "./Handlers";

export class CommandHandler {
    command: string
    objectType: string
    data: string

    constructor(string: string) {
        const array = string.split(' ');

        if (array.length >= 1) this.command = array[0].toLowerCase();
        if (array.length >= 2) this.objectType = array[1].toLowerCase();
        if (array.length >= 3) this.data = array.slice(3).join(" ");
    }

    async handleCommand(): Promise<string> {
        switch (this.command) {
            case 'get': return getCommand(this);
            case 'create': return "CREATE Command";
            case 'update': return "UPDATE Command";
            case 'ping': return "PONG";
            default: return "Command not recognized";
        }
    }
}