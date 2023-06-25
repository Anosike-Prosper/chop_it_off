import { urlModel } from "../models/url.model";
import { urlInfoModel } from "../models/url.info";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";

const updateURLInfo = () => {

}

const getLongUrl = async (shortId: string, ip: string, agent: any) => {
  const data= await urlModel.find({shortId})
  const url_id=  data[0].id

  if(data.length <= 0){

    throw new AppError(
      "Long url does not exist",
      StatusCodes.CONFLICT
    );
   
  }


  data[0].click = data[0].click.valueOf() + 1

  await urlInfoModel.create({
    ip,
    agent,
    url_Id: data[0].id,
  });

  data.forEach( async(document)=>{
     await document.save()
  })

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