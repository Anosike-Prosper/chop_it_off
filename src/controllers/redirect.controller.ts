import { Request, Response, NextFunction } from "express";
import { getLongUrl, findUrl } from "../services/url.services";
import cache from "../config/cache";
import { AppError } from "../errors/appError";

const redirectToUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheClient = await cache();

  try {
    if (req.params.shortcode) {
      const ip = req.ip;
      const agent = req.headers["user-agent"];
      
      let url;
      url = await cacheClient.hGet("", req.params.shortcode); // check if shortcode is in the cache
      if (!url) {
        const res = await findUrl(req.params.shortcode);
      
        url = res?.longurl;
        if(!url)
          throw new AppError('Invalid shortcode', 404);

        await cacheClient.hSet("", req.params.shortcode, url ?? "");
      }
      res.redirect(url as string);
      await getLongUrl(req.params.shortcode, ip, agent);
    
    }
  } catch (err) {
    
    next(err);
  }
};

export { redirectToUrl };
