import { Link } from "@tanstack/react-router"

export function Header() {
    return(
        <>
            <nav className="bg-white px-6 py-2 shadow-md">
                <div className="flex justify-between items-center gap-8">
                    <Link to ="/">
                        <img 
                            alt="MongoDB logo" 
                            className="h-10 inline" 
                            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
                            width="120"
                            height="40"
                            loading="eager"
                            style={{ maxHeight: '2.5rem', width: 'auto' }}
                        />
                    </Link>
                    <Link to ="/browse" className="text-lime-800 text-lg font-semibold hover:text-green-700">
                        Browse
                    </Link>
                </div>
            </nav>
        </>
    )
}