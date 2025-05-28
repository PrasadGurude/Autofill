const { Router } = require("express");
const userRouter = require("./user/index.js");
const formRouter = require("./form/index.js");

const router = Router();

router.use("/user",userRouter);
router.use("/form",formRouter);

module.exports = router;