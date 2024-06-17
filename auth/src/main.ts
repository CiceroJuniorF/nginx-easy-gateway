import express from 'express';
import session from 'express-session';
import LoginController from './controllers/LoginController';
import LoginMemoryService from './services/LoginMemoryService';
import bodyParser from 'body-parser';

const app = express().disable("x-powered-by");;
const port = 3000;

const sessionSecret = process.env.SESSION_SECRET || 'chubou_nat_kako';

declare module "express-session" {
    interface SessionData {
        user: string;
        groups: string[];
        routes: string[];
    }
}

app.use(bodyParser.json());

const THREE_HOURS = 1000 * 60 * 60 * 3;
// add redis to save session
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    name: "sid",
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: THREE_HOURS,
    },
}));


const loginController = new LoginController(new LoginMemoryService());

// TODO: Add JWT support
app.post("/auth/login", (req, res) => loginController.login(req, res));

app.all("/validate/:route?", (req, res) => {
    console.log(req.params.route, req.session.routes);
    if(!req.session.user) {
        res.status(401).send();
        return;
    }
    if(req.params.route && !req.session.routes?.includes(req.params.route)) {
        res.status(403).send();
        return;
    }
    res.status(200).setHeader("Custom-header", JSON.stringify({user: req.session.user, groups: req.session.groups})).send();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

