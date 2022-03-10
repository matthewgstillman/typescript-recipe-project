import React, { useState, FC, FormEvent } from "react";
import NavBarComponent from "./NavBarComponent";
import { Container } from "react-bootstrap";
import "../index.css";
export interface Recipe {
  ingredientString: string | "";
}

export interface RandomMetaRecipe {
  randomMetaTitle: string | "";
  randomMetaSourceUrl: string | "";
  randomMetaReadyInMinutes: number | "";
  randomMetaImage: string | "";
  randomMetaSummary: string | "";
  randomMetaInstructions: string | "";
  // randomMetaRecipe?: Recipe | "";
}

const RandomRecipe: FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  console.log(`API key is ${apiKey}`);
  const [cuisineType, setCuisineType] = useState<string | "">("");
  // const [mealType, setMealType] = useState<string | "">("");
  const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${cuisineType}`
  );
  const [randomRecipe, setRandomRecipe] = useState<Recipe[]>([
    { ingredientString: "" },
  ]);
  const [randomRecipeDataMeta, setRandomRecipeDataMeta] = useState<
    RandomMetaRecipe[]
  >([
    {
      randomMetaTitle: "",
      randomMetaSourceUrl: "",
      randomMetaReadyInMinutes: "",
      randomMetaImage: "",
      randomMetaSummary: "",
      randomMetaInstructions: "",
    },
  ]);
  const [recipeTitle, setRecipeTitle] = useState<string | "">("");

  const handleCuisineChange = (event: FormEvent<HTMLSelectElement>) => {
    const inputValue: string = event.currentTarget.value;
    console.log(event.currentTarget.value);
    setCuisineType(event.currentTarget.value);
    setUrl(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${inputValue}`
    );
    // setCuisineType(inputValue);
    console.log(`URL is now: ${url}\nCuisine type is now: ${cuisineType}`);
    // getRandomRecipe();
  };

  const getRandomRecipe = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const titleText = data["recipes"][0]["title"];
        // console.log(titleText);
        const recipe = data["recipes"];
        console.log(recipe);
        const title = recipe[0]["title"];
        const sourceUrl = recipe[0]["sourceUrl"];
        const readyInMinutes = recipe[0]["readyInMinutes"];
        const image = recipe[0]["image"];
        const summary = recipe[0]["summary"];
        const instructions = recipe[0]["instructions"];
        console.log(`Instructions: ${instructions}`);
        const extendedIngredients = data["recipes"][0]["extendedIngredients"];
        const randomRecipeArray = [{ ingredientString: "" }];
        const randomRecipeDataMetaArray = [
          {
            randomMetaTitle: title,
            randomMetaSourceUrl: sourceUrl,
            randomMetaReadyInMinutes: readyInMinutes,
            randomMetaImage: image,
            randomMetaSummary: summary,
            randomMetaInstructions: instructions,
          },
        ];
        setRandomRecipeDataMeta(randomRecipeDataMetaArray);
        {
          extendedIngredients.map((ingredient: { original: string }) => {
            randomRecipeArray.push({ ingredientString: ingredient.original });
          });
          setRandomRecipe(randomRecipeArray);
          console.log(randomRecipeArray, randomRecipeDataMetaArray);
        }
        return data;
      })
      .then((data) => {
        console.log(data);
        setRandomRecipeDataMeta([
          {
            randomMetaTitle: data[0]["recipes"]["title"],
            randomMetaSourceUrl: data[0]["recipes"]["sourceUrl"],
            randomMetaReadyInMinutes: data[0]["recipes"]["readyInMinutes"],
            randomMetaImage: data[0]["recipes"]["image"],
            randomMetaSummary: data[0]["recipes"]["summary"],
            randomMetaInstructions: data[0]["recipes"]["instructions"],
          },
        ]);
      })
      .catch(() => {
        console.error("error");
      });
    console.log(`After method: ${randomRecipeDataMeta}`);
    console.log(randomRecipeDataMeta);
  };

  return (
    <div>
      <NavBarComponent />
      <Container>
        <h1 className="randomRecipeHeader">Random Recipe Data</h1>
        <h3 className="selectHeader">
          Select Cuisine and Meal Type (Optional)
        </h3>
        <select className="selectForm" onChange={(e) => handleCuisineChange(e)}>
          <option value="" disabled selected>
            Select cuisine type
          </option>
          <option value="">None</option>
          <option value="german">German</option>
          <option value="indian">Indian</option>
          <option value="irish">Irish</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="jewish">Jewish</option>
          <option value="korean">Korean</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="mexican">Mexican</option>
          <option value="southern">Southern</option>
          <option value="spanish">Spanish</option>
          <option value="thai">Thai</option>
          <option value="vietnamese">Vietnamese</option>
        </select>
        <br></br>
        <button className="randomRecipeButton" onClick={getRandomRecipe}>
          Get Random Recipe
        </button>
        <br></br>
        <h1>Recipe Title: {recipeTitle}</h1>
        {randomRecipeDataMeta &&
          randomRecipeDataMeta.map((randomMeta) => {
            return (
              <div>
                <div>
                  <a href={randomMeta.randomMetaSourceUrl}>
                    <h1 className="recipeTitleLink">
                      {randomMeta.randomMetaTitle}
                    </h1>
                  </a>
                  <h6 className="readyInHeader">
                    Ready in {randomMeta.randomMetaReadyInMinutes} minutes
                  </h6>
                  <img
                    className="randomMetaImage"
                    src={randomMeta.randomMetaImage}
                    alt=""
                  />
                  <h1>Summary</h1>
                  <div
                    className="summaryParagraph"
                    dangerouslySetInnerHTML={{
                      __html: randomMeta.randomMetaSummary,
                    }}
                  />
                  <br></br>
                  <h1>Instructions</h1>
                  <div
                    className="instructionsParagraph"
                    dangerouslySetInnerHTML={{
                      __html: randomMeta.randomMetaInstructions,
                    }}
                  />
                </div>
              </div>
            );
          })}
        <br />
        <br />
        <h1>Ingredients</h1>
        {randomRecipe &&
          randomRecipe.map((random) => {
            return (
              <div className="ingredientsParagraph">
                {random.ingredientString !== "" ? (
                  <h6> {random.ingredientString}</h6>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        <br></br>
        <br />
      </Container>
    </div>
  );
};

export default RandomRecipe;
