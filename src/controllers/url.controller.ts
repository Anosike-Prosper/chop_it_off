// // // const AppError = require("../errors/appError");
// import { Error } from "mongoose";
import { urlModel } from "../models/url.model";
import { Request, Response, NextFunction } from "express";
import { urlInfoModel } from "../models/url.info";

import qrcode from 'qrcode'
import { nanoid } from "nanoid";
// import { findUser } from "../services/url.services";
import { AppError } from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import { findone } from "../services/url.services";
import config from "../config/config";



const createUrl = async (req: Request & { user?: { id?: string } }, res: Response, next: NextFunction) => {

  try {
    const { longurl, customId } = req.body;
    console.log(longurl, customId)
    const shortId = !customId ? nanoid(10) : customId;

    const shortUrl = `${config.BASE_URL}/url/${shortId}`;
    const ownerId = req?.user?.id
    // console.log(typeof ownerId)

    const findShortId= await urlModel.findOne({
      shortId
    })

    if(findShortId){
      throw new AppError(
        "A url with this short code already exist.",
        StatusCodes.CONFLICT
      );
    }

    const existingUrl = await urlModel.findOne({
      longurl: longurl,
      ownerId: ownerId,
    });

    if (existingUrl) {
      throw new AppError(
        "Long url already exist",
        StatusCodes.CONFLICT
      );
    }

   
    const data = await urlModel.create({
      longurl,
      shortId,
      ownerId,
      shorturl: shortUrl,
    });

    return res.status(201).json({
      data,
      message: "success",
    });
  } catch (err) {
    
    next(err);
  }
};

const getAllUrl= async(req:Request & { user?: { id?: string } }, res:Response, next:NextFunction)=>{
    const ownerId = req?.user?.id
  const data= await urlModel.find({ownerId:ownerId})
  return res.status(200).json({
    count: data.length,
    data,
    message:"success"
  })
  
}

const getqrCode = async(req:Request & { user?: { id?: string } }, res:Response, next:NextFunction)=>{
  try{

    const {longurl} = req.body// Extract the URL from the query stringow
    const ownerId = req?.user?.id as string
    const shortId = nanoid(10);
    
    const shortUrl = `localhost:4000/url/${shortId}`;
    
    
    
    // const existingUrl = await urlModel.findOne({
    //   longurl: longurl,
    //   ownerId: ownerId,
    // });
    const existingUrl = await findone(longurl, ownerId)
    
    if (existingUrl) {
      throw new AppError(
        "Long url already exist",
        StatusCodes.CONFLICT
      );
    }
    
    
    
    const url = await urlModel.create({
      longurl,
      shortId,
      ownerId,
      shorturl: shortUrl,
    });
    
    
      
        const data = await qrcode.toDataURL(url.shorturl); // Generate the QR code as a data URL
      
      res.status(StatusCodes.OK).json({data})
  }catch(err:any){
    next(err)
  }
  

    
  }
  
  const GetUrlInfo = async( req:Request & { user?: { id?: string } }, res:Response, next:NextFunction)=> {
    try{

      const ownerId= req?.user?.id as string
      const id = req.params.id
      
      // const data = await findone(id, ownerId )
      const data = await urlModel.findOne({_id:id, ownerId})
      console.log(data)
  
      if(!data){
        throw new AppError(
          "Long url does not exist",
          StatusCodes.CONFLICT
        );
      }
  
      const urlRequestInfo = await urlInfoModel.find({ url_Id: id })
      res.status(200).json( { data, count: urlRequestInfo.length, reqInfo: urlRequestInfo })
    }catch(err:any){
      next(err)
    }



    
  }

export { createUrl, getAllUrl, getqrCode, GetUrlInfo };
