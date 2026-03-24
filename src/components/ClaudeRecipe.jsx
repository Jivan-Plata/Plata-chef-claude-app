import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="text-[#475467] leading-8 text-lg font-normal" aria-live="polite">
            <h2 className="font-semibold text-2xl text-black mb-4">Chef Claude Recommends:</h2>
            <article aria-live="polite">
                <ReactMarkdown
                    components={{
                        // 1. Style the main recipe title (h3 or h2 depending on AI output)
                        h3: ({node, ...props}) => <h3 className="font-bold text-xl text-black mt-8 mb-4" {...props} />,
                        
                        // 2. Ingredients List (Unordered)
                        ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 mb-8 ml-4" {...props} />,

                        // 3. Instructions List (Ordered)
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-4 mb-8 ml-4 last:mb-0" {...props} />,

                        // 4. List Items: The "pl-2" gives just enough breathing room
                        li: ({node, ...props}) => <li className="pl-2" {...props} />,

                        // 5. CRITICAL FIX: Paragraphs inside lists
                        // This checks if a paragraph is inside a list item. If so, it renders as a <span> 
                        // to prevent the "new line" block behavior.
                        p: ({node, ...props}) => {
                            if (node.children[0] && node.children[0].tagName === "strong") {
                                return <span className="block mb-2" {...props} /> 
                            }
                            return <p className="mb-4 inline-block" {...props} />
                        },
                        
                        // 6. Strong tags (Headings like "Ingredients:" or "Instructions:")
                        strong: ({node, ...props}) => <strong className="font-bold text-black" {...props} />
                    }}
                >
                    {props.recipe}
                </ReactMarkdown>
            </article>
        </section>
    )
}