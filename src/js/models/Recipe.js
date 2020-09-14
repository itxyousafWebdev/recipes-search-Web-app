import axios from "axios";

export default class Recipe {
    constructor(id)
    {
        this.id = id;
    }

    async getRecipeData()
    {
        try{
            var res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

            this.imgURL = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.publisher = res.data.recipe.publisher;
            this.scorceURL = res.data.recipe.source_url;
            this.title = res.data.recipe.title;
            this.time = Math.ceil(this.ingredients.length / 3) * 15;
            this.servings = 4;
        }
        catch(error){
            console.log(error);
        }
    }

    updateRecipe(type)
    {
        let newServing = type === "dec" ? this.servings-1 : this.servings+1;
        this.ingredients.forEach( cur => {
            cur.count = (newServing/this.servings) * cur.count;
        });
        this.servings = newServing;
    }

    parseIngredients()
    {
        let arrIngredient = [];
        const newIngredients = this.ingredients.map( cur => {
            cur = cur.toLowerCase();
            cur = cur.trim();

            cur = cur.replace("tablespoons", "tbsp");
            cur = cur.replace("tablespoon", "tbsp");
            cur = cur.replace("ounces", "oz");
            cur = cur.replace("ounce", "oz");
            cur = cur.replace("teaspoons", "tsp");
            cur = cur.replace("teaspoon", "tsp");
            cur = cur.replace("cups", "cup");
            cur = cur.replace("pounds", "pound");
            cur = cur.replace("-", " ");

            cur = cur.replace(/ *\([^)]*\)*/g, "");

            arrIngredient = cur.split(" ");
            let unitIndex = arrIngredient.findIndex( cur2 => {
                if(cur2 === "tbsp" || cur2 === "oz" || cur2 === "tsp" || cur2 === "cup" || cur2 === "pound"){
                    return true;
                }
            });

            let ingredientObj;
            if (unitIndex > -1 && parseInt(arrIngredient[0])){
                let totalCount = parseInt(arrIngredient[0]);
                let x;
                if (parseInt(arrIngredient[1])){
                    x = arrIngredient.slice(3);
                    totalCount = eval(arrIngredient[0] + "+" + arrIngredient[1]).toFixed(1);
                    totalCount = parseFloat(totalCount);
                }
                else{
                    x = arrIngredient.slice(2);
                }

                
                ingredientObj = {
                    count: totalCount,
                    unit: arrIngredient[unitIndex],
                    ingredient: x.join(" ")
                }
            }
            else if (parseInt(arrIngredient[0])){
                let x = arrIngredient.slice(1);
                ingredientObj = {
                    count: parseInt(arrIngredient[0]),
                    unit: "",
                    ingredient: x.join(" ")          
                }
            }
            else if (unitIndex > -1 && !parseInt(arrIngredient[0]) ){
                let x = arrIngredient.slice(1);
                ingredientObj = {
                    count: 1,
                    unit: arrIngredient[unitIndex],
                    ingredient: x.join(" ")
                }
            }
            else if (unitIndex === -1){
                ingredientObj = {
                    count:  1,
                    unit: "",
                    ingredient: cur
                }
            }

            return ingredientObj;
        });
        this.ingredients = newIngredients;
    }
} 