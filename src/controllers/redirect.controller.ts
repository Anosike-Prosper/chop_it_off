import { Request, Response, NextFunction } from "express";
import { getLongUrl, findUrl } from "../services/url.services";
import cache from "../config/cache";

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
      url = await cacheClient.hGet("", req.params.shortcode);
      if (!url) {
        const res = await findUrl(req.params.shortcode);
        console.log(res)
        url = res?.longurl;
        if(!url)
          throw new Error("adsafd");

        await cacheClient.hSet("", req.params.shortcode, url ?? "");
      }
      res.redirect(url as string);
      await getLongUrl(req.params.shortcode, ip, agent);
      console.log('abyss')
    }
  } catch (err) {
    console.log("errrrorrrrrrrrrr", err);
    next(err);
  }
};

export { redirectToUrl };
