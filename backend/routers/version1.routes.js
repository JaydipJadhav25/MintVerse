
import {Router} from "express";

const router = Router();


router.get("/"  , (req, res)=>{
    return res.send("<h1>This is V1 Router!</h1>")
});







export default router;
