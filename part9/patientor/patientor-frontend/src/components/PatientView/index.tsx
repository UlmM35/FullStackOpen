import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

const PatientView = () => {
    const match = useMatch('/patients/:id');
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        patientService.getOne(match?.params.id as string).then(data => {
            setPatient(data);
        });
        diagnosisService.getAll().then(data => {
            setDiagnoses(data);
        });
    }, [match?.params.id]);

    if (!patient || !diagnoses) return null;

    return (
        <>
            <h1>{patient.name} {patient.gender === 'male' && <MaleIcon />}
            {patient.gender === 'female' && <FemaleIcon />}
            {patient.gender === 'other' && <TransgenderIcon/>}
            </h1>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h2>entries</h2>
            {patient.entries?.map(entry => (
                <div key={entry.id}>
                    <div>{entry.date} <i>{entry.description}</i></div>
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default PatientView;