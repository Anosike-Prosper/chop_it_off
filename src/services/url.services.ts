import { urlModel } from "../models/url.model";
import { urlInfoModel } from "../models/url.info";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";



const getLongUrl = async (shortId: string, ip: string, agent: any) => {
  const data = await urlModel.findOne({shortId})

  if(!ip || !agent){
    throw new AppError('Ip or user-agent must be provided', 500)
  }

  if(!data){
    throw new AppError(
      "Long url does not exist",
      StatusCodes.CONFLICT
    );
  }


  data.click = data?.click.valueOf() + 1

  await urlInfoModel.create({
    ip,
    agent,
    url_Id: data.id,
  });

  
  await data.save()

  return data
  };

  

  const findone = async (id:string, userId:string)=>{
    const data = await urlModel.findOne({longurl:id, ownerId:userId})
    return data
  }

  const findUrl = async (url: string) => {
    const data = await urlModel.findOne({shortId:url})
    return data
  }
  

 
  
 

  
  export {getLongUrl, findone, findUrl}