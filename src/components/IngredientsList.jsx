export default function IngredientsList(props) {

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li className="list-disc list-inside" key={ingredient}>{ingredient}</li>
    ))

    return (
        <section className="flex flex-col gap-4">

            <h2 className="font-semibold text-3xl">Ingredients on hand:</h2>

            <ul className="space-y-4 text-[#475467]" aria-live="polite">{ingredientsListItems}</ul>

            {props.ingredients.length > 3 && 
            <div className="bg-[#f0efeb] rounded-[10px] w-full flex flex-row justify-between items-center py-[clamp(1rem,2vw+0.5rem,2rem)] px-[clamp(1rem,2vw+1.25rem,3rem)] my-8">
                
                <div className="flex flex-col gap-2" ref = {props.ref}>
                    <h3 className="text-lg font-medium">Ready for a recipe?</h3>
                    <p className="text-gray-500 text-base leading-5">Generate a recipe from your list of ingredients.</p>
                </div>

                <button className="border-none rounded-md bg-[#d17557] text-white py-[0.8rem] px-[clamp(1.3rem,1.118rem+0.909vw,1.8rem)] font-inter text-sm cursor-pointer" onClick={props.getRecipe}>{props.isGenerating? "Generating..." : "Get a recipe"}</button>

            </div>}
            
        </section>
    )
}