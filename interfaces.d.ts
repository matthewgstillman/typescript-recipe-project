export interface Meal {
  id: number | null;
  imageType: string | null;
  readyInMinutes: number | null;
  servings: number | null;
  sourceUrl: string | null;
  title: string | null;
  instructions: string | null;
}

export interface Nutrients {
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
}

export interface Recipe {
  amount: number;
  unit: string;
  originalName: string;
  ingredientString: string;
}

export interface RandomMetaRecipe {
  randomMetaSourceUrl: string;
  randomMetaReadyInMinutes: number;
  randomMetaImage: string;
  randomMetaSummary: string;
  randomMetaInstructions: string;
  randomMetaRecipe: Recipe;
}
