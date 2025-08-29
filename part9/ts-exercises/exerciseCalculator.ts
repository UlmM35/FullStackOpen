interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (trainingLength: number[], target: number): Result => {

    const trainedDays: number = trainingLength.filter(day => day > 0).length

    let description: string;

    const calculateAverage = (days: number[]): number => {
        return days.reduce((accum, curr) => accum + curr, 0)/days.length
    }

    const calculateRating = (days: number[], target: number): number => {
        const avg = calculateAverage(days)
        if (avg >= target) {
            description = 'good'
            return 3
        } else if (avg < target && avg - target < 0.5) {
            description = 'okay'
            return 2
        } else {
            description = 'bad'
            return 1
        }
    }

    const result: Result = {
        periodLength: trainingLength.length,
        trainingDays: trainedDays,
        success: trainingLength.length <= trainedDays,
        rating: calculateRating(trainingLength, target),
        ratingDescription: description,
        target: target,
        average: trainingLength.reduce((accum, curr) => accum + curr, 0)/trainingLength.length
    }

    return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))