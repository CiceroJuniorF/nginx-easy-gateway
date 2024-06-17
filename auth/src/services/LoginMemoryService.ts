import { SessionData } from "express-session";
import { Unathorized } from "../errors/Unathorized";
import { Groups } from "../constants/Groups";
import { LoginService } from "./interfaces/LoginService";

export default class LoginMemoryService implements LoginService{
    private readonly _users: { [key: string]: { password: string, groups: string[], routes: string[] } } = {
        "admin@inc.com": { password: "123", groups: [Groups.ADMIN], routes: ["m1", "m2", "private"]},
        "user1@inc.com": { password: "123", groups: [Groups.READ_ONLY], routes: ["m1", "private"]},
        "user2@inc.com": { password: "123", groups: [Groups.READ_ONLY], routes: ["m2", "private"]},
    }
    public async login({user, password}: {user:string, password: string}): Promise<{user: string, groups: string[], routes: string[]}> {
        if(!this._users[user] || this._users[user].password !== password) {
            throw new Unathorized();
        }
        return {
            user: user,
            groups: this._users[user].groups,
            routes: this._users[user].routes
        }
    }
}