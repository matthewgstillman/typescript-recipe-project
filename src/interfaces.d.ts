export interface Meal {
  id: number;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  title: string;
}

export interface Nutrients {
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
}

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
