import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function VenueSubmit({ closeVenueSubmit }: { closeVenueSubmit: (venueData: any) => void }) {
    const emptyVenue = {
        name: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        capacity: ''
    }

    const [formData, setFormData] = useState(emptyVenue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json'
        }

        fetch('https://events-server-3c0nlgv6r-wallfacers-projects.vercel.app/api/venues/create', {
            method: 'POST',
            headers,
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(venueData => {
                console.log('Venue submitted:', formData)
                console.log({venueData})
                closeVenueSubmit(venueData)
            }).catch(error => console.error(error))
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="relative">
                <CardTitle>Add New Venue</CardTitle>
                <CardDescription>Enter the details of the new venue below.</CardDescription>
                <Button onClick={closeVenueSubmit} className="absolute top-2 right-2">Close</Button>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Venue Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="street1">Street Address 1</Label>
                        <Input id="street1" name="street1" value={formData.street1} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="street2">Street Address 2</Label>
                        <Input id="street2" name="street2" value={formData.street2} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="zipcode">Zip Code</Label>
                            <Input id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Add Venue</Button>
                </CardFooter>
            </form>
        </Card>
    )
}