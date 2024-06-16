import { SessionData } from "express-session";
import { Unathorized } from "../errors/Unathorized";
import { Groups } from "../constants/Groups";

export default class LoginMemoryService {
    private readonly _users: { [key: string]: { password: string, groups: string[] } } = {
        admin: { password: "admin", groups: [Groups.M1, Groups.M2, Groups.PRIVATE] },
        m1: { password: "m1", groups: [Groups.M1, Groups.PRIVATE] },
        m2: { password: "m2", groups: [Groups.M2, Groups.PRIVATE] },
    }
    public async login({user, password}: {user:string, password: string}): Promise<{user: string, groups: string[]}> {
        if(!this._users[user] || this._users[user].password !== password) {
            throw new Unathorized();
        }
        return {
            user: user,
            groups: this._users[user].groups,
        }
    }
}