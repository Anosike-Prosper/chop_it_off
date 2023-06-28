import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { verifyUser } from "../middlewares/auth";
import { GetUrlInfo, createUrl, getAllUrl,getqrCode } from "../controllers/url.controller";
import { urlValidatorMiddleware } from "../validators/url.validator";
import {redirectToUrl} from '../controllers/redirect.controller'




const router = Router();



router.post("/",urlValidatorMiddleware, verifyUser, createUrl);

router.post('/qrcode',urlValidatorMiddleware, verifyUser, getqrCode )

router.get("/", verifyUser,getAllUrl)

router.get('/:shortcode',  redirectToUrl)

router.get('/info/:id',verifyUser,GetUrlInfo)





export default router;
