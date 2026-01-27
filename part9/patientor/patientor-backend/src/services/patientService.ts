import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patients.map(({ ssn, entries, ...rest }) => rest);
};

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};

export default {
    getPatients,
    addPatient,
    findById
};