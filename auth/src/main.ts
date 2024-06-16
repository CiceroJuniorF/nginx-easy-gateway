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
    }
}

app.use(bodyParser.json());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    name: "x_session",
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 3,
    },
}));


const loginController = new LoginController(new LoginMemoryService());

app.post("/auth/login", (req, res) => loginController.login(req, res));

app.get("/auth/authorization", (req, res) => {
    console.log("AQUI EU ENTREI")
    console.log(req.query.action);
    res.status(200).send();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

