export class Unathorized extends Error {
    constructor() {
        super("User not found");
    }
}