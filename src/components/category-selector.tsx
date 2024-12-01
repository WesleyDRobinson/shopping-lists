import {useCallback} from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import {ActionMeta, MultiValue} from 'react-select'
import {Label} from "@/components/ui/label.tsx";

// Define the option type
export interface CategoryOption {
    readonly value: number
    readonly label: string
}

export default function CategorySelector({setSelectedCategories}: {
    setSelectedCategories: (categories: MultiValue<CategoryOption>) => void
}) {
    const loadOptions = useCallback((): Promise<CategoryOption[]> => {
        return fetch('https://events-server-3c0nlgv6r-wallfacers-projects.vercel.app/api/categories/list')
            .then(response => response.json())
            .then(data => {
                return data.map((category: { id: number; name: string }) => ({value: category.id, label: category.name}));
            }).catch(error => console.error(error))
    }, [])

    const handleChange = (
        newValue: MultiValue<CategoryOption>,
        actionMeta: ActionMeta<CategoryOption>
    ) => {
        console.log('Action:', actionMeta.action)
        if (actionMeta.action === 'create-option') {
            console.log({newValue})
            // Here you would typically send the new category to your backend
            const headers = {
                'Content-Type': 'application/json'
            }
            fetch('https://events-server-3c0nlgv6r-wallfacers-projects.vercel.app/api/categories/create', {
                method: 'POST',
                headers,
                body: JSON.stringify({category: newValue[newValue.length - 1].label})
            })
                .then(response => response.json())
                .then(data => {
                    console.log({data})
                    setSelectedCategories([...newValue.slice(0, newValue.length - 1), {
                        value: data.id,
                        label: data.name
                    }])
                })
        } else {
            setSelectedCategories(newValue)
        }

    }

    return (
        <div>
            <Label htmlFor="category">Select or Add Categories</Label>

            <AsyncCreatableSelect
                id="category"
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={handleChange}
                placeholder="Select or create categories..."
                className="text-sm"
                classNamePrefix="react-select"
            />
        </div>
    )
}