import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { fileUploader } from '../../helper/file.uploader'
import { UserValidation } from './user.validation'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()


router.get(
    "/",
    auth(UserRole.ADMIN),
    UserController.getAllFromDB
)
router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req: Request, res:Response, next:NextFunction) => {
        req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createPatient(req, res, next)
    }   
)


router.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
);

router.post(
    "/create-doctor",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(JSON.parse(req.body.data))
        req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createDoctor(req, res, next)
    }
);
export const userRoutes = router
