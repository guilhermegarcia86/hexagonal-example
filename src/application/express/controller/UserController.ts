import express, { Request, Response } from "express";
import { UserService } from "../../../core/service/UserService";

const router = express.Router()

const userService: UserService = new UserService()

router.post('/', async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  res.json(user)
})

router.get('/all', async (req: Request, res: Response) => {
  const users = await userService.findAllUsers()
  res.json(users)
})

export default router