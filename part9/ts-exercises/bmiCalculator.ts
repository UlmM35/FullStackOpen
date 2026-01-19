import { isNotNumber } from "./utils/isNotNumber";

interface BmiValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
    const heightToMeters: number = height/100;
    const bmi: number = (weight/(heightToMeters* heightToMeters));
    if (bmi < 18.5) {
        console.log('Underweight');
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        console.log('Normal weight');
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        console.log('Overweight');
        return "Overweight";
    } else {
        console.log('Obese');
        return "Obese";
    }
    
};

if (require.main === module) {
    try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
}


