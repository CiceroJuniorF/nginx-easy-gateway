import { Unathorized } from "../errors/Unathorized";
import { Request, Response } from "express";
import { LoginService } from "../services/interfaces/LoginService";

export default class LoginController {

    constructor(private _loginService: LoginService) { }

    public async login(req: Request, res: Response) {
        try {
            console.log(req.body);
            const sessionData =  await this._loginService.login(req.body);
            req.session.user = sessionData.user;
            req.session.groups = sessionData.groups;
            req.session.routes = sessionData.routes;
            return res.status(200).send("Ok");
        } catch (e) {
            if (e instanceof Unathorized) {
                return res.status(401).send("Unathorized");
            }
        }
    }
}