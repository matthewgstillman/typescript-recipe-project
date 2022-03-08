import React, { useState, FC } from "react";
// import "../interfaces.d.ts";
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
  randomMetaRecipe?: Recipe | "";
}

const RandomRecipe: FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  console.log(`API key is ${apiKey}`);
  const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/recipes/random?apiKey=62c09a4a046944019321583648539eae&number=1&tags=`
  );
  console.log(`URL is ${url}`);
  const [randomRecipe, setRandomRecipe] = useState<Recipe[]>([
    {
      ingredientString: "",
    },
  ]);
  const [randomRecipeDataMeta, setRandomRecipeDataMeta] = useState<
    RandomMetaRecipe[]
  >([
    {
      randomMetaTitle: "Dutch Babies With Mulberry-Rhubarb Compote",
      randomMetaSourceUrl:
        "http://www.foodista.com/recipe/F7B527KX/dutch-babies-with-mulberry-rhubarb-compote",
      randomMetaReadyInMinutes: 45,
      randomMetaImage:
        "https://spoonacular.com/recipeImages/641766-556x370.jpg",
      randomMetaSummary:
        'Dutch Babies With Mulberry-Rhubarb Compote might be just the side dish you are searching for. One serving contains <b>429 calories</b>, <b>8g of protein</b>, and <b>16g of fat</b>. For <b>$2.58 per serving</b>, this recipe <b>covers 10%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 34 foodies and cooks. It is a good option if you\'re following a <b>vegetarian</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Head to the store and pick up cup vanilla sugar, salt, orange juice, and a few other things to make it today. All things considered, we decided this recipe <b>deserves a spoonacular score of 35%</b>. This score is not so tremendous. Try <a href="https://spoonacular.com/recipes/mulberry-rhubarb-compote-80998">Mulberry-rhubarb Compote</a>, <a href="https://spoonacular.com/recipes/means-dutch-babies-141505">Mean\'s Dutch Babies</a>, and <a href="https://spoonacular.com/recipes/apricot-almond-dutch-babies-759970">Apricot-Almond Dutch Babies</a> for similar recipes.',
      randomMetaInstructions:
        "<ol><li>For the compote: Pulse the rhubarb in the food processor 5-6 times to a diced consistency. Then pulse the mulberries 3-4 times to chop.</li><li>Add rhubarb, mulberries, orange juice, sugar, salt and cornstarch to a sauce pan and simmer over medium for 10-15 minutesstirring occasionally.</li><li>Remove from heat and stir in the fresh mint leaves. Makes approximately 2 cups.</li><li>Dutch Babies: Preheat the oven to 375*F. In the blender, add the flour, sugar, salt, milk and eggs. Process for 10 seconds, then add 2 Tb. of melted butter and process again.</li><li>Brush the remaining 4 Tb. of butter into 24 muffin tinsthoroughly coating. Slowly pour the batter into the muffins tins.</li><li>Bake for 12-14 minutesuntil edges are golden brown and the center is puffed.</li><li>Immediately remove the Dutch babies from the muffins tins and top with mulberry-rhubarb compote!</li><li>Serves 6+.</li><li>If making the traditional way, this is enough batter for two cast-iron skillets.</li></ol>",
    },
  ]);

  const getRandomRecipe = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const extendedIngredients = data["recipes"][0]["extendedIngredients"];
        // console.log(extendedIngredients);
        console.log(data);
        const randomRecipeArray = [{ ingredientString: "" }];
        const randomMetaArray = [
          {
            randomMetaTitle: "",
            randomMetaSourceUrl: "",
            randomMetaReadyInMinutes: 0,
            randomMetaImage: "",
            randomMetaSummary: "",
            randomMetaInstructions: "",
          },
        ];
        // {
        //   data.map(
        //     (item: {
        //       title: string;
        //       sourceUrl: string;
        //       readyInMinutes: number;
        //       image: string;
        //       summary: string;
        //       instructions: string;
        //     }) => {
        //       randomMetaArray.push({
        //         randomMetaTitle: item.title,
        //         randomMetaSourceUrl: item.sourceUrl,
        //         randomMetaReadyInMinutes: item.readyInMinutes,
        //         randomMetaImage: item.image,
        //         randomMetaSummary: item.summary,
        //         randomMetaInstructions: item.instructions,
        //       });
        //     }
        //   );
        //   setRandomRecipeDataMeta(randomMetaArray);
        // }
        {
          extendedIngredients.map((ingredient: { original: string }) => {
            randomRecipeArray.push({ ingredientString: ingredient.original });
          });
          setRandomRecipe([...randomRecipeArray]);
        }
        console.log(randomRecipeArray);
        console.log(randomRecipe);
        // {
        // }
        // for (let i = 0; i < data["recipes"][0]["extendedIngredients"]; i++) {
        //   // console.log(data["recipes"][0]["extendedIngredients"][i]["original"]);
        // }
        // setRandomRecipe({
        //   ...data["recipes"][0]["extendedIngredients"],
        // });
        // for (
        //   let i = 0;
        //   i < data["recipes"][0]["extendedIngredients"].length;
        //   i++
        // ) {
        //   console.log(data["recipes"][0]["extendedIngredients"][i]);
        // }
      })
      .catch(() => {
        console.error("error");
      });
  };

  // for (let i = 0; i < mealData.length; i++) {
  //   console.log(mealData[i]);
  // }

  // for (const [key, value] of Object.entries(mealData[0])) {
  //   console.log(`${key}: ${value}`);
  // }

  return (
    <div>
      <h1>This is the Random Recipe Page</h1>
      <h2>URL is {url}</h2>
      <button onClick={getRandomRecipe}>Get Meal Data</button>
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
                <h6>Ready in {randomMeta.randomMetaReadyInMinutes} minutes</h6>
                <img
                  className="randomMetaImage"
                  src={randomMeta.randomMetaImage}
                  alt=""
                />
                <h1>Instructions</h1>
                <div
                  className="summaryParagraph"
                  dangerouslySetInnerHTML={{
                    __html: randomMeta.randomMetaSummary,
                  }}
                />
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
      {randomRecipe &&
        randomRecipe.map((random) => {
          return (
            <div>
              <h6>{random.ingredientString}</h6>
            </div>
          );
        })}
    </div>
  );
};

export default RandomRecipe;
