import { Unathorized } from "../errors/Unathorized";
import LoginMemoryService from "../services/LoginMemoryService";
import { Request, Response } from "express";

export default class LoginController {

    constructor(private _loginService: LoginMemoryService) { }

    public async login(req: Request, res: Response) {
        try {
            console.log(req.body);
            const sessionData =  await this._loginService.login(req.body);
            req.session.user = sessionData.user;
            req.session.groups = sessionData.groups;
            return res.status(200).send("Logged in");
        } catch (e) {
            if (e instanceof Unathorized) {
                console.debug("User not found");
                return res.status(401).send("User not found");
            }
        }
    }
}