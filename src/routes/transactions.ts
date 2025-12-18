import { Router } from "express";
const router: Router = Router();

router.get("/test", (req, res) => {
    res.send("Endpoint is working");
})

export default router;