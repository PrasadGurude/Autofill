const { Form } = require("../../model/index.js");
const { authenticate } = require("../../middleware.js");
const { Router } = require("express");

const router = Router();
router.use(authenticate)

router.post("/submit",async (req, res) => {
  // This endpoint is for submitting a form
  const formData = req.body;

  const userId = req.user.id; 
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      status: "error",
    });
  }
  const from =await Form.create(
    {
      userId: userId,
      formData: {...formData},
    }
  )

  res.status(200).json({
    message: "Welcome to the API",
    status: "success",
  });
}); 

router.get("/status",async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      status: "error",
    });
  }

  const formData =await Form.findOne({userId: userId});

  if (!formData) {
    return res.status(404).json({
      message: "No forms found for this user",
      status: "error",
    });
  }

  res.status(200).json({
    message: "Forms retrieved successfully",
    status: "success",
    formData: formData,
  });

});

module.exports = router;