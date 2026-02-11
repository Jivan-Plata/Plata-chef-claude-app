import React, { useRef } from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"

export default function MainContent() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isGenerating, setIsGenerating] = React.useState(false)
    const recipeSection = useRef(null)

    async function getRecipe() {
        setIsGenerating(prevGenerating => (!prevGenerating))

        const response = await fetch("/.netlify/functions/get-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        })
      
        const data = await response.json()
        setRecipe(data.recipe)
        
        setIsGenerating(prevGenerating => (!prevGenerating))
      }
      
    React.useEffect(() => {
        if (recipeSection.current !== null && recipe !== "") {

            recipeSection.current.scrollIntoView({behavior: "smooth"})   
        }
    }, [recipe])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main className="bg-[#fafaf8] py-[clamp(2rem,2vw+1.25rem,3rem)] px-[clamp(2rem,4vw+1rem,4rem)] rounded-b-xl w-full flex flex-col gap-8">

            <form action={addIngredient} className="flex justify-between flex-wrap gap-8 w-full">

                <input
                    className="rounded-md border border-gray-300 shadow-sm grow p-3.5"
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button className="font-inter rounded-md border-none bg-[#141413] text-[#FAFAF8] font-medium py-[0.8rem] px-[1.8rem] before:content-['+'] before:mr-2">Add ingredient</button>

            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref = {recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isGenerating = {isGenerating}
                />
            }

            {recipe && <ClaudeRecipe recipe = {recipe} />}
        </main>
    )
}