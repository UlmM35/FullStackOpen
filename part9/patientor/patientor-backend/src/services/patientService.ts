import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient
};