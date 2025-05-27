import { Router } from "express";
import userRouter from "./user/index.js";
import formRouter from "./form/index.js";

const router = Router();

router.use("/user",userRouter);
router.use("/form",formRouter);

export default router;