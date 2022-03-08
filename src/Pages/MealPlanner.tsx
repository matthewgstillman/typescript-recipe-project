import React, { useState, FC } from "react";
interface Meal {
  id: number;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  title: string;
}

interface Nutrients {
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
}

const MealPlanner: FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  console.log(`API key is ${apiKey}`);
  const [mealData, setMealData] = useState<Meal[]>([
    {
      id: 1084681,
      imageType: "jpg",
      readyInMinutes: 5,
      servings: 2,
      sourceUrl: "https://www.bbcgoodfood.com/recipes/elderflower-gin",
      title: "Elderflower gin",
    },
  ]);
  const [nutrientData, setNutrientData] = useState<Nutrients[]>([
    {
      calories: 2000.09,
      protein: 44.86,
      fat: 64.43,
      carbohydrates: 166.67,
    },
  ]);
  const [calories, setCalories] = useState<number>(2000);
  const [dietType, setDietType] = useState<string>("vegetarian");
  const [mealPlanSubmitted, setMealPlanSubmitted] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}&diet=${dietType}`
  );
  console.log(`URL is ${url}`);

  const getMealData = () => {
    console.log(`Calories: ${calories}, Diet: ${dietType}`);
    setMealPlanSubmitted(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMealData([...data["meals"]]);
        setNutrientData([...data["nutrients"]]);
        console.log(data["meals"]);
      })
      .catch(() => {
        console.error("error");
      });
  };

  for (let i = 0; i < mealData.length; i++) {
    console.log(mealData[i]);
  }

  for (const [key, value] of Object.entries(mealData[0])) {
    console.log(`${key}: ${value}`);
  }
  return (
    <div>
      <h1>This is the Random Recipe Page</h1>
      <h2>URL is {url}</h2>
      <button onClick={getMealData}>Get Meal Data</button>
      {mealData &&
        mealData.map((meal) => {
          {
            return (
              <div>
                <h1>
                  <a href={meal.sourceUrl}>{meal.title}</a>
                </h1>
              </div>
            );
          }
        })}
      {nutrientData &&
        nutrientData.map((nutrients) => {
          return (
            <div>
              <h1>Daily Nutrients</h1>
              <h4>Calories: {nutrients.calories}</h4>
              <h4>Protein: {nutrients.calories} grams</h4>
              <h4>Fat: {nutrients.fat} grams</h4>
              <h4>Carbohydrates: {nutrients.carbohydrates} grams</h4>
            </div>
          );
        })}
    </div>
  );
};

export default MealPlanner;
