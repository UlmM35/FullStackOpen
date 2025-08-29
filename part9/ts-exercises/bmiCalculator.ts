const calculateBmi = (height: number, weight: number): string => {
    const heightToMeters: number = height/100
    const bmi: number = (weight/(heightToMeters* heightToMeters))
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal range'
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

console.log(calculateBmi(180, 74))