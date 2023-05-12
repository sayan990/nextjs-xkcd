import { Text, Container } from "@nextui-org/react";
import Link from "next/link";

export function Header() {
    return<header className="flex justify-between items-center p-4 bg-gray-800 m-w-xl m-auto">
      
        <h1>xkcd</h1>
        
        <nav>
            <ul className="flex flex-row gap-2">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/search">Search</Link></li>
            </ul>
        </nav>
    </header>
}