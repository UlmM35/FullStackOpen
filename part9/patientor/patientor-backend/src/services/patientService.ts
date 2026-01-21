import patientData from "../../data/patients";
import { NonSensitivePatient } from "../types";

const patients: NonSensitivePatient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
    return patients;
};

export default {
    getPatients
};