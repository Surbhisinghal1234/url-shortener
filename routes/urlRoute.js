import  express from "express"
import handleGenerateShortURL from "../controllers/urlController.js"
import {handleVisitHistory} from "../controllers/urlController.js"
import {handleGetAnalytics} from "../controllers/urlController.js"

const router = express.Router()

router.post("/",handleGenerateShortURL)
router.get("/:shortId",handleVisitHistory)
router.get("/analytics/:shortId",handleGetAnalytics)


export default router
