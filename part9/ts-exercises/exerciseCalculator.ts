interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (trainingDays: number[], target: number): Result => {

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

    return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))