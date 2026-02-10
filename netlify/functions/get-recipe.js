export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { ingredients } = JSON.parse(event.body);
    const ingredientsString = ingredients.join(", ");

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct", 
        provider: "hf-inference",
        messages: [
          {
            role: "system",
            content: `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown.
            IMPORTANT FORMATTING RULES:
            1. Do not start the recipe title on a new line inside a sentence.
            2. For instructions, use a numbered list.
            3. CRITICAL: Each instruction step must be a SINGLE paragraph. Do not put the step title on its own line.
              Example of CORRECT format:
              1. **Cook the Rice:** Rinse the rice under cold water... (rest of text on same line)
              Example of WRONG format:
              1. **Cook the Rice**
              Rinse the rice...`
          },
          {
            role: "user",
            content: `I have these ingredients: ${ingredientsString}. Please suggest a recipe.`,
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF ROUTER ERROR:", response.status, errorText);
      return {
        statusCode: response.status,
        body: errorText,
      };
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: recipeText }),
    };

  } catch (err) {
    console.error("HANDLER ERROR:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}