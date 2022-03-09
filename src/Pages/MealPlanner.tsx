import React, { useState, FC, FormEvent } from "react";
import NavBarComponent from "./NavBarComponent";

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

  const dietFormatDictionary = {
    none: "None",
    "gluten-free": "Gluten Free",
    keto: "Keto",
    vegetarian: "Vegetarian",
    "lacto-vegetarian": "Lacto Vegetarian",
    "ovo-vegetarian": "Ovo Vegetarian",
    paleo: "Paleo",
    primal: "Primal",
    pescetarian: "Pescetarian",
    vegan: "Vegan",
    whole30: "Whole 30",
  };

  const getMealData = () => {
    console.log(`Calories: ${calories}, Diet: ${dietType}`);
    setMealPlanSubmitted(true);
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}&diet=${dietType}`
    )
      .then((response) => response.json())
      .then((data) => {
        // setMealData(data);
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleCalorieChange = (event: FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    // setCalories(event.currentTarget.value);
    setUrl(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${event.currentTarget.value}&diet=${dietType}`
    );
    console.log(`URL is now: ${url}\nCalorie numbe is now: ${calories}`);
    getMealData();
  };

  const handleDietChange = (event: FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setDietType(event.currentTarget.value);
    setUrl(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${calories}&diet=${dietType}`
    );
  };

  return (
    <div>
      <NavBarComponent />
      <section className="controls">
        <h1 className="mealPlanHeader">Meal Plan</h1>
        <h3>
          Create a Daily Meal Plan by Providing Your Calories and Diet Type
        </h3>
        <h3>Desired Daily Calories (1500-4000)</h3>
        <select onChange={(e) => handleCalorieChange(e)}>
          <option value={1500}>1500</option>
          <option value={1750}>1750</option>
          <option value={2000}>2000</option>
          <option value={2250}>2250</option>
          <option value={2500}>2500</option>
          <option value={2750}>2750</option>
          <option value={3000}>3000</option>
          <option value={3250}>3250</option>
          <option value={3500}>3500</option>
          <option value={3750}>3750</option>
          <option value={4000}>4000</option>
        </select>
        <br />
        <h3>Add dietary restrictions (Optional)</h3>
        <select placeholder="Diet Type" onChange={handleDietChange}>
          <option value="">None</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="keto">Keto</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto-vegetarian">Lacto-Vegetarian</option>
          <option value="ovo-vegetarian">Ovo-Vegetarian</option>
          <option value="paleo">Paleo</option>
          <option value="primal">Primal</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="vegan">Vegan</option>
          <option value="whole30">Whole 30</option>
        </select>
        <br />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        <br />
        <br />
        <h1>
          {/* {calories && dietType !== "none" && mealPlanSubmitted ? (
            `${calories} Calorie ${dietFormatDictionary[dietType]} Meal Plan`
          ) : (
            <></>
          )} */}
        </h1>
        {/* {mealData && <MealList mealData={mealData} />} */}
      </section>
    </div>
  );
};

export default MealPlanner;
