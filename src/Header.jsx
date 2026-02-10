import chefClaudeLogo from "./images/chef-claude-icon.png"

export default function() {
    return (
        <header className="flex flex-row items-center justify-center p-6 gap-4 bg-white w-full border-b-2 border-solid border-[#e1e1df] rounded-t-xl">
            <img className = "h-auto block w-12.5" src = {chefClaudeLogo} />
            <h1 className="font-normal text-3xl">Chef Claude</h1>
        </header>
    )
}