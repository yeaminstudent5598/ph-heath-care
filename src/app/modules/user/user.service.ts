import { Request } from "express";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/file.uploader";
import { Admin, Doctor, UserRole } from "@prisma/client";


const createPatient = async(req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.patient.profilePhoto= uploadResult?.secure_url
    }

 const hashPassword = await bcrypt.hash(req.body.password, 10);

 const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
        data:{
            email: req.body.patient.email,
            password: hashPassword,
        }
    });
    return await tnx.patient.create({
        data: req.body.patient
    })
 })
 return result;
}


const createAdmin = async (req: Request): Promise<Admin> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
};


const getAllFormDB = async ({page, limit, searchTerm, sortBy, sortOrder}: {page:number, limit:number, searchTerm?: any, sortBy: any, sortOrder: any}) => {
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const result = await prisma.user.findMany({
        skip,
        take: limitNumber,

        where: {
            email: {
                contains: searchTerm,
                mode: "insensitive"
            }
            
        },
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        },
        include: {
            patient: true
        }
    });
    return result
}

export const UserService = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFormDB,
}