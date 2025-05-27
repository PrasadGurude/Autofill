import e, { Router } from "express";
import { Form } from "../../model";
import { authenticate } from "../../middleware";

const router = Router();
router.use(authenticate)

router.get("/submit", (req, res) => {
  // This endpoint is for submitting a form
  const formData = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      message: "No data provided",
      status: "error",
    });
  }

  const userId = req.user.id; 
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      status: "error",
    });
  }
  const from = Form.create(
    {
      userId: userId,
      formData: formData,
    }
  )

  res.status(200).json({
    message: "Welcome to the API",
    status: "success",
  });
}); 

router.get("/status", (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      status: "error",
    });
  }

  const formData = Form.findOne({ userId: userId });
  
  if (!formData) {
    return res.status(404).json({
      message: "Form not found",
      status: "error",
    });
  }  

  res.status(200).json({
    message: "Form status endpoint",
    status: "submitted",  
    formData: formData.formData,
  });
});

export default router;