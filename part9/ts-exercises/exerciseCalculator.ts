import { isNotNumber } from "./utils/isNotNumber";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArgs = (args: string[]): number[] => {
    if (args.length < 1) throw new Error('Not enough arguments');

    if (!(args.some((x) => isNotNumber(x)))) {
        return args.map(Number);
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (trainingDays: number[], target: number) => {

    const trainedDays: number = trainingDays.filter(day => day > 0).length

    const calculateAverage = (days: number[]): number => {
        return days.reduce((accum, curr) => accum + curr, 0)/days.length
    }

    const average = calculateAverage(trainingDays);

    const calculateRating = (avg: number, target: number): { rating: number; description: string } => {
        if (avg >= target) {
        return { rating: 3, description: 'good' };
        } else if (target - avg < 0.5) {
        return { rating: 2, description: 'okay' };
        } else {
        return { rating: 1, description: 'bad' };
        }
    };

    const { rating, description } = calculateRating(average, target)

    const result: Result = {
        periodLength: trainingDays.length,
        trainingDays: trainedDays,
        success: trainingDays.length <= trainedDays,
        rating: rating,
        ratingDescription: description,
        target: target,
        average: calculateAverage(trainingDays)
    }

    console.log(result)
}

try {
    const parsedArgs = parseArgs(process.argv.slice(2));
    calculateExercises(parsedArgs.slice(1), parsedArgs[0]);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
