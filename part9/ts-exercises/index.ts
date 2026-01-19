import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Result } from "./exerciseCalculator";
import { isNotNumber } from "./utils/isNotNumber";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    height: heightNum,
    weight: weightNum,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  if (daily_exercises.some((x: any) => isNotNumber(x)) || isNotNumber(target)) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const result: Result = calculateExercises(daily_exercises.map(Number), Number(target));

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});