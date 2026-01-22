import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import patientService from "../services/patientService";
import { newEntrySchema } from "../utils";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;