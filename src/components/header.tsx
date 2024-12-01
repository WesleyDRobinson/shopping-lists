// import {Search, Menu} from 'lucide-react'
import {Button} from "@/components/ui/button"
import React from "react"
// import {Input} from "@/components/ui/input"

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/*<Button variant="ghost" size="icon" className="lg:hidden text-white">*/}
                        {/*    <Menu className="h-6 w-6"/>*/}
                        {/*    <span className="sr-only">Open menu</span>*/}
                        {/*</Button>*/}

                        <a href="#" className="flex items-center space-x-2 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-8 h-8">
                                <path
                                    d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                            </svg>
                            <span className="text-2xl font-bold whitespace-nowrap">Local Events</span>
                        </a>
                    </div>
                    {/*<nav className="hidden lg:flex space-x-4">*/}
                    {/*    <a href="#" className="text-white hover:text-gray-700 transition-colors">Home</a>*/}
                    {/*    <a href="#" className="text-white hover:text-gray-700 transition-colors">Features</a>*/}
                    {/*    <a href="#" className="text-white hover:text-gray-700 transition-colors">Pricing</a>*/}
                    {/*    <a href="#" className="text-white hover:text-gray-700 transition-colors">About</a>*/}
                    {/*</nav>*/}
                    <div className="flex items-center space-x-4">
                        {/*<form className="hidden md:block">*/}
                        {/*    <div className="relative flex items-center">*/}
                        {/*        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-300"/>*/}
                        {/*        <Input*/}
                        {/*            type="search"*/}
                        {/*            placeholder="Search..."*/}
                        {/*            className="pl-8 pr-4 py-2 w-full bg-white/10 text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white rounded-full"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</form>*/}

                        <Button variant="ghost" size="icon" className="rounded-full">
                            <img
                                src={`https://robohash.org/${Math.random().toString(36).slice(2, 5)}.png`}
                                alt="User avatar"
                                className="rounded-full"
                                width={64}
                                height={64}
                            />
                            <span className="sr-only">User menu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
