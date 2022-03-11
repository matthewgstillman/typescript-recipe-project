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
  // randomMetaRecipe?: Recipe | "";
}

const RandomRecipe: FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const [cuisineType, setCuisineType] = useState<string | "">("");
  const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=${cuisineType}`
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
  const [recipeTitle, setRecipeTitle] = useState<string | "">("");

  const handleCuisineChange = (event: FormEvent<HTMLSelectElement>) => {
    const inputValue: string = event.currentTarget.value;
    console.log(event.currentTarget.value);
    setCuisineType(event.currentTarget.value);
    setUrl(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=${inputValue}`
    );
    console.log(`URL is now: ${url}\nCuisine type is now: ${cuisineType}`);
  };

  const getRandomRecipe = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const recipes = data["recipes"];
        console.log(recipes);
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
              console.log(recipe["extendedIngredients"]);
              randomRecipeDataMetaArray.push(recipe);
            }
          );
          console.log(randomRecipeDataMetaArray);
          setRandomRecipeDataMeta(randomRecipeDataMetaArray);
        }

        console.log(randomRecipeDataMeta[0]["extendedIngredients"]);
        //Newness
        // {
        //   recipes.map((recipe: { extendedIngredients: {} }) => {
        //     console.log(recipe["extendedIngredeints"]);
        //   });
        // }
        //Newness
        const ingredientArray = [
          {
            0: data["recipes"][0]["extendedIngredients"],
            1: data["recipes"][1]["extendedIngredients"],
            2: data["recipes"][2]["extendedIngredients"],
          },
        ];
        // {
        //   data.recipes.map(
        //     (
        //       recipe: { extendedIngredients: { original: string } },
        //       index: number
        //       // extendedIngredients: { original: string }
        //     ) => {
        //       console.log(recipe["extendedIngredients"]);
        //       console.log(index);
        //       // {recipe["extendedIngredients"].map((ingredient: string) => {

        //       // })}
        //       ingredientArray[index] = recipe["extendedIngredients"];
        //     }
        //   );
        // }

        console.log(ingredientArray);

        const fullIngredients = data["recipes"][0]["extendedIngredients"];
        const randomRecipeArray = [{ ingredientString: "" }];
        {
          fullIngredients.map((ingredient: { original: string }) => {
            randomRecipeArray.push({ ingredientString: ingredient.original });
          });
          // console.log(randomRecipeArray);
          setRandomRecipe(randomRecipeArray);
          // console.log(randomRecipeArray, randomRecipeDataMetaArray);
        }
        return data;
      })
      // .then((data) => {
      //   console.log(data);
      //   // setRandomRecipeDataMeta([
      //   //   {
      //   //     title: data[0]["recipes"]["title"],
      //   //     sourceUrl: data[0]["recipes"]["sourceUrl"],
      //   //     readyInMinutes: data[0]["recipes"]["readyInMinutes"],
      //   //     image: data[0]["recipes"]["image"],
      //   //     summary: data[0]["recipes"]["summary"],
      //   //     instructions: data[0]["recipes"]["instructions"],
      //   //   },
      //   // ]);
      // })
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
          randomRecipeDataMeta.map((randomMeta, index) => {
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
                      <h1>Instructions</h1>
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
                  {/* <div>
                    <h1>Ingredients</h1>
                    {randomMeta.extendedIngredients &&
                      randomMeta.extendedIngredients[index][0]}
                  </div> */}
                  {/* <h1>Ingredients</h1>
                  {randomMeta.extendedIngredients &&
                    randomMeta.extendedIngredients.map((ingredient) => {
                      {
                        ingredient.ingredientString !== "" ? (
                          <h6> {ingredient.ingredientString}</h6>
                        ) : (
                          <></>
                        );
                      }
                    })} */}
                  {/* <div>
                      <h1>{randomMeta.extendedIngredients && randomMeta.extendedIngredients.0}</h1>
                    </div> */}
                </div>
                <br />
                <br />
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
