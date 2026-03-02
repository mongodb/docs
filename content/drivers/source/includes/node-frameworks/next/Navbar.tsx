import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          MongoDB Restaurants
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            All Restaurants
          </Link>
          <Link
            href="/browse"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Filtered Restaurants
          </Link>
        </div>
      </div>
    </nav>
  );
}

