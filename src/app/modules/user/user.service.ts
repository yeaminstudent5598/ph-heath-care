import { Request } from "express";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/file.uploader";


const createPatient = async(req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        console.log("hello world",{uploadResult})
        console.log("REQ.FILE:", req.file);

    }

//  const hashPassword = await bcrypt.hash(req.body.password, 10);

//  const result = await prisma.$transaction(async (tnx) => {
//     await tnx.user.create({
//         data:{
//             email: req.body.email,
//             password: hashPassword,
//         }
//     });
//     return await tnx.patient.create({
//         data: {
//             name: req.body.name,
//             email: req.body.email
//         }
//     })
//  })

//  console.log(result)
//  return result;
}

export const UserService = {
    createPatient
}