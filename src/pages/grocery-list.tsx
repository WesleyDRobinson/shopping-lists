'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { useToast } from "@/components/ui/use-toast"
import { getGroceryList, addGroceryItem, updateGroceryItemStatus, removeGroceryItem } from '../lib/grocery-actions'

type GroceryItem = {
    id: number
    name: string
    status: 'need' | 'maybe'
}

const groceryItems = [
    "Yogurt", "Berries", "Almonds", "Granola", "Crackers", "Gum", "Crisps", "English muffins",
    "Dave's Bread raisin", "Dave's Bread", "Ice cream", "Cheeses", "Fruit", "La croix",
    "cheese", "pickles", "mustard", "ketchup", "Cups", "Blueberries", "Strawberries",
    "Date rolls", "Lettuce", "Onion", "Tomato", "Beers", "Raisin bread", "Ice",
    "Contractor bags", "Turkey meat", "Ground beef", "Salmon", "Bacon", "Apples",
    "Bananas", "Red onion", "Cilantro", "Bread", "Almond milk", "Orange juice",
    "Cauliflower pizza crust", "Zoodles", "Mangoes", "Pears", "Some Meals", "Salad kit",
    "Sliced cheese", "Stok Coffee", "Bunny crackers (confetti, cheese)", "Applesauce",
    "Juice", "Veggie chips", "Parmesan", "Popcorn", "Edemame", "Rice crackers (little)",
    "Olive packs", "Zoodles", "Pads", "Frozen spinach", "Raisins", "Pea crisps",
    "Lemon", "Flour", "Pine nuts", "Meat option"
]

export default function GroceryList() {
    const [list, setList] = useState<GroceryItem[]>([])
    const [customItem, setCustomItem] = useState('')
    const [isOffline, setIsOffline] = useState(false)
    // const { toast } = useToast()

    useEffect(() => {
        fetchGroceryList()
    }, [])

    const fetchGroceryList = async () => {
        try {
            const result = await getGroceryList()
            if (result.items) {
                const { items } = result
                const list = items.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    status: item.status
                }))
                setList(list)
                setIsOffline(false)
                localStorage.setItem('groceryList', JSON.stringify(result.items))
            } else {
                throw new Error('Failed to fetch items from database')
            }
        } catch (error) {
            setIsOffline(true)
            const localList = localStorage.getItem('groceryList')
            if (localList) {
                setList(JSON.parse(localList))
            }
            // toast({
            //     title: "Offline Mode",
            //     description: "Using local storage. Changes won't be saved to the database.",
            //     variant: "warning",
            // })
        }
    }

    const addToList = async (item: string, status: 'need' | 'maybe') => {
        try {
            if (!isOffline) {
                const result = await addGroceryItem(item, status)
                if (result.success) {
                    fetchGroceryList()
                    return
                }
            }
            throw new Error('Failed to add item to database')
        } catch (error) {
            const newItem: GroceryItem = {
                id: Date.now(),
                name: item,
                status: status
            }
            const updatedList = [...list, newItem]
            setList(updatedList)
            localStorage.setItem('groceryList', JSON.stringify(updatedList))
        }
    }

    const updateStatus = async (id: number, status: 'need' | 'maybe') => {
        try {
            if (!isOffline) {
                const result = await updateGroceryItemStatus(id, status)
                if (result.success) {
                    fetchGroceryList()
                    return
                }
            }
            throw new Error('Failed to update item status in database')
        } catch (error) {
            const updatedList = list.map(item =>
                item.id === id ? { ...item, status } : item
            )
            setList(updatedList)
            localStorage.setItem('groceryList', JSON.stringify(updatedList))
        }
    }

    const removeFromList = async (id: number) => {
        try {
            if (!isOffline) {
                const result = await removeGroceryItem(id)
                if (result.success) {
                    fetchGroceryList()
                    return
                }
            }
            throw new Error('Failed to remove item from database')
        } catch (error) {
            const updatedList = list.filter(item => item.id !== id)
            setList(updatedList)
            localStorage.setItem('groceryList', JSON.stringify(updatedList))
        }
    }

    const handleCustomItemSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (customItem.trim()) {
            addToList(customItem.trim(), 'need')
            setCustomItem('')
        }
    }

    const generateSMSText = () => {
        let text = 'Shopping List:\n\n'
        text += list.map(item => `${item.status === 'need' ? '[Need]' : '[Maybe]'} ${item.name}`).join('\n')
        return encodeURIComponent(text)
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Grocery List</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add Items</h2>
                    <ScrollArea className="h-[400px] border rounded-md p-4">
                        <ul className="space-y-2">
                            {groceryItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{item}</span>
                                    <div>
                                        <Button size="sm" variant="outline" className="mr-2" onClick={() => addToList(item, 'need')}>Need</Button>
                                        <Button size="sm" variant="outline" onClick={() => addToList(item, 'maybe')}>Maybe</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>

                <div>
                    <form onSubmit={handleCustomItemSubmit} className="mt-4">
                        <Label htmlFor="custom-item">Add custom item:</Label>
                        <div className="flex mt-2">
                            <Input
                                id="custom-item"
                                type="text"
                                value={customItem}
                                onChange={(e) => setCustomItem(e.target.value)}
                                placeholder="Enter custom item"
                                className="mr-2"
                            />
                            <Button type="submit">Add</Button>
                        </div>
                    </form>

                    <h2 className="text-xl font-semibold my-4">Your List</h2>
                    <ScrollArea className="h-[400px] border rounded-md p-4">
                        <ul className="space-y-2">
                            {list.map((item) => (
                                <li key={item.id} className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                            item.status === 'need' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                    ></span>
                      {item.name}
                  </span>
                                    <div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mr-2"
                                            onClick={() => updateStatus(item.id, item.status === 'need' ? 'maybe' : 'need')}
                                        >
                                            {item.status === 'need' ? 'Maybe' : 'Need'}
                                        </Button>
                                        <Button size="sm" variant="destructive"
                                                onClick={() => removeFromList(item.id)}>Remove</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
            </div>

            <div className="my-6 text-center">
                <a
                    href={`sms:?body=${generateSMSText()}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Share via SMS
                </a>
            </div>

            {isOffline && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Offline Mode</p>
                    <p>You're currently working offline. Changes will be saved locally but not synced to the database.</p>
                </div>
            )}
        </div>
    )
}