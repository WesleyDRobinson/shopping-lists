import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Venue, VenueSelector} from "@/components/venue-selector.tsx";
import VenueSubmit from "@/components/venue-submit.tsx";
import CategorySelector, {CategoryOption} from "@/components/category-selector.tsx";
import {MultiValue} from "react-select";

function EventSubmit() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venue, setVenue] = useState<Venue | null>(null);
    const [description, setDescription] = useState('');
    const [addingVenue, setAddingVenue] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<MultiValue<CategoryOption>>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a new event object
        const newEvent = {
            name,
            date,
            startTime,
            endTime,
            venue: venue?.id,
            description,
            categories: selectedCategories?.map((category) => category.value),
            owners: [1]
        };

        // Here you can handle the submission
        // For example, sending the data to an API
        console.log('Event submitted:', newEvent);

        const headers = {
            'Content-Type': 'application/json'
        }
        fetch('https://events-server-3c0nlgv6r-wallfacers-projects.vercel.app/api/events/create', {
            method: 'POST',
            headers,
            body: JSON.stringify(newEvent)
        })
            .then(response => response.json())
            .then(data => {
                console.log({data})
            }).catch(error => console.error(error))


        // Optionally reset the form
        // setName('');
        // setDate('');
        // setStartTime('');
        // setEndTime('');
        // setVenue('');
        // setDescription('');
        // setCategories([]);
    };

    const showVenueSubmit = (): void => {
        setAddingVenue(true);
    }

    const closeVenueSubmit = (data: any): void => {
        // Here you can handle the data returned from the venue submission
        console.log('Venue submitted:', data);

        setAddingVenue(false);
    }

    const onVenueSelect = (venue: Venue): void => {
        setVenue(venue);
    }

    return (
        <div className="p-2">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Submit a Community Event</CardTitle>

                    <CardDescription>Share your event with the local community</CardDescription>
                </CardHeader>

                <form className={addingVenue ? "hidden" : ""} onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Event Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter event name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your event"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="time">Time Start</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="time">Time End</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <VenueSelector
                                onVenueSelect={onVenueSelect}
                                showVenueSubmit={showVenueSubmit}/>
                        </div>

                        <div className="space-y-1">
                            <CategorySelector setSelectedCategories={setSelectedCategories}/>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full">Submit Event</Button>
                    </CardFooter>
                </form>

                {addingVenue && <VenueSubmit closeVenueSubmit={closeVenueSubmit}/>}
            </Card>
        </div>
    );
}

export default EventSubmit;