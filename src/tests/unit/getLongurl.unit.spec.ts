import request from "supertest";
import { app } from "../../app";
import { IUser, userModel } from "../../models/user.model";
import { urlModel, IUrl } from "../../models/url.model";
import mongoose, { Model } from "mongoose";
import { getLongUrl } from "../../services/url.services";
import { urlInfoModel } from "../../models/url.info";

describe("success", () => {
    it("tests", ()=>{
        const data = ({
              longurl: "https://hey.com",
              shorturl: "ggg",
              shortId: "string",
              ownerId: "Types.ObjectId",
              click: 2,
              save: jest.fn()
            })
    
            //   jest.spyOn("data", "save");
            
            jest.spyOn(urlInfoModel, "create").mockReturnValue(null as any);
            jest.spyOn(urlModel, "findOne").mockReturnValue(data as any);
    

      getLongUrl("ggg", "102.23.34.334", "stick")
      .then((url) => {
        expect(urlModel.findOne).toHaveBeenCalledWith({ shortId: "ggg" });
    
        console.log(url)
        expect(url.click).toEqual(3);
      });
    })

    it("tests", ()=>{
        const data = ({
              longurl: "https://hey.com",
              shorturl: "ggg",
              shortId: "string",
              ownerId: "Types.ObjectId",
              click: 2,
              save: jest.fn()
            })
    
      jest.spyOn(urlModel, "findOne").mockReturnValue(data as any);
    //   jest.spyOn("data", "save");
    
      jest.spyOn(urlInfoModel, "create").mockReturnValue(null as any);
    

      expect(() =>
        getLongUrl("ggg", "", "stick")
    ).rejects.toThrow();

    //   .then((url) => {
    //     expect(urlModel.findOne).toHaveBeenCalledWith({ shortId: "ggg" });
    
        // console.log(url)
    //   });
    })


    it("tests", ()=>{

      jest.spyOn(urlModel, "findOne").mockReturnValue(null as any);
    //   jest.spyOn("data", "save");
    
    //   jest.spyOn(urlInfoModel, "create").mockReturnValue(null as any);
    

      expect(() =>
        getLongUrl("", "12.33.44", "stick")
    ).rejects.toThrow();

    //   .then((url) => {
    //     expect(urlModel.findOne).toHaveBeenCalledWith({ shortId: "ggg" });
    
        // console.log(url)
    //   });
    })

});




//       
//     
//      

//       

//  

