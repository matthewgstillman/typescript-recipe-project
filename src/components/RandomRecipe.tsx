import React, { useState, FC, FormEvent } from "react";
import NavBarComponent from "./NavBarComponent";
import { Container } from "react-bootstrap";
import "../index.css";
export interface Recipe {
  ingredientString: string | "";
}

export interface RandomMetaRecipe {
  title: string | "";
  sourceUrl: string | "";
  readyInMinutes: number | null;
  image: string | "";
  summary: string | "";
  instructions: string | "";
  extendedIngredients?: Recipe[] | "";
}
const RandomRecipe: FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const [cuisineType, setCuisineType] = useState<string | "">("");
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
      title: "",
      sourceUrl: "",
      readyInMinutes: null,
      image: "",
      summary: "",
      instructions: "",
      extendedIngredients: "",
    },
  ]);
  const [recipeSubmitted, setRecipeSubmitted] = useState<boolean>(false);

  const handleCuisineChange = (event: FormEvent<HTMLSelectElement>) => {
    const inputValue: string = event.currentTarget.value;
    setCuisineType(event.currentTarget.value);
    setUrl(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${inputValue}`
    );
  };

  const getRandomRecipe = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const recipes = data["recipes"];
        const randomRecipeDataMetaArray: React.SetStateAction<
          RandomMetaRecipe[]
        > = [];
        {
          recipes.map(
            (recipe: {
              title: string;
              sourceUrl: string;
              readyInMinutes: number;
              image: string;
              summary: string;
              instructions: string;
              extendedIngredients: Recipe[];
            }) => {
              randomRecipeDataMetaArray.push(recipe);
            }
          );
          setRandomRecipeDataMeta(randomRecipeDataMetaArray);
        }

        const fullIngredients = data["recipes"][0]["extendedIngredients"];
        const randomRecipeArray = [{ ingredientString: "" }];
        {
          fullIngredients.map((ingredient: { original: string }) => {
            randomRecipeArray.push({ ingredientString: ingredient.original });
          });
          setRandomRecipe(randomRecipeArray);
          setRecipeSubmitted(true);
        }
        return data;
      })
      .catch(() => {
        console.error("error");
      });
  };

  return (
    <div>
      <NavBarComponent />
      <Container>
        <h1 className="randomRecipeHeader">Random Recipe Generator</h1>
        <br />
        <h3 className="selectHeader">Select Cuisine Type (Optional)</h3>
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
          <option value="southern">Southern</option>
          <option value="spanish">Spanish</option>
          <option value="thai">Thai</option>
          <option value="vietnamese">Vietnamese</option>
        </select>
        <br></br>
        <br />
        <button className="randomRecipeButton" onClick={getRandomRecipe}>
          Get Random Recipe
        </button>
        <br></br>
        <br></br>
        {randomRecipeDataMeta &&
          randomRecipeDataMeta.map((randomMeta) => {
            return (
              <div>
                <div>
                  <a href={randomMeta.sourceUrl}>
                    <h1 className="recipeTitleLink">{randomMeta.title}</h1>
                  </a>
                  {randomMeta.readyInMinutes !== null ? (
                    <h6 className="readyInHeader">
                      Ready in {randomMeta.readyInMinutes} minutes
                    </h6>
                  ) : (
                    <></>
                  )}
                  {randomMeta.image !== "" ? (
                    <img
                      className="randomMetaImage"
                      src={randomMeta.image}
                      alt=""
                    />
                  ) : (
                    <></>
                  )}
                  {randomMeta.summary !== "" ? (
                    <div>
                      <br />
                      <h1>Summary</h1>
                      <div
                        className="summaryParagraph"
                        dangerouslySetInnerHTML={{
                          __html: randomMeta.summary,
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <br></br>
                  {randomMeta.instructions !== "" ? (
                    <div>
                      {/* <h1>Instructions</h1> */}
                      <div
                        className="instructionsParagraph"
                        dangerouslySetInnerHTML={{
                          __html: randomMeta.instructions,
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        <br />
        {recipeSubmitted == true ? <h1>Ingredients</h1> : <></>}
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
