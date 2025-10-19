import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);
  // console.log(result)
//   console.log(req)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient created successfully!",
    data: result
  })
})


const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, searchTerm, sortBy, sortOrder} = req.query;
  const result = await UserService.getAllFormDB({page: Number(page), limit: Number(limit), searchTerm, sortBy, sortOrder});
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User retrive successfully!",
    data: result
  })
})

export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFormDB,
}