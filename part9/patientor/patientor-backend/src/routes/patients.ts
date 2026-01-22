import express from "express";
import { Response } from "express";
import { NonSensitivePatient} from "../types";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedPatientEntry = patientService.addPatient(newPatientEntry);
        res.json(addedPatientEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong :(';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;