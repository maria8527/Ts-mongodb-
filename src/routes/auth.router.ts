import express, { Request, Response } from "express";
import auth from "../firebase/auth"
import authSchema from "../schemas-joi/firebase.schema";
export const authRouter = express.Router();
import { createValidator } from "express-joi-validation";

const validator = createValidator();

authRouter.post('/createUser', validator.body(authSchema), async (_req: Request, res: Response)=> {
    try {
        const { email, password } = _req.body
        const result = await auth.createUser(email, password);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

authRouter.post('/logIn', validator.body(authSchema), async (_req: Request, res: Response)=> {
    try {
        const { email, password } = _req.body
        const result = await auth.logIn(email, password);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})