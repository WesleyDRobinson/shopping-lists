import {Dispatch, SetStateAction} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CalendarIcon} from "@/components/icons/calendar";
import {Button} from "@/components/ui/button.tsx";

export interface Event {
    id: number,
    event_name: string
    date: string
    time: string
    timezone?: null
    description: string
    venue_name: string
    street1?: string
    street2?: null
    city?: string
    state?: string
    zipcode?: string
    country?: string
    capacity?: number
    categories?: { id: string, name: string }[]
    owners?: { id: string, name: string }[]
    approval?: 'allowed' | 'rejected' | 'pending'
}

interface EventCardProps {
    event: Event;
    setEvents: Dispatch<SetStateAction<Event[]>>

}

export const EventCard = ({event, setEvents}: EventCardProps) => {
    const userId = 1
    let currEvent = event

    const submitChange = (action: 'allowed' | 'rejected') => {
        const method = 'PUT'
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = JSON.stringify({event_id: currEvent.id, approval: action, userId})
        fetch('http://localhost:3000/api/events/edit', {
            method,
            headers,
            body
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.event)
                setEvents((prevEvents: Event[]) => prevEvents.map((event: Event) => event.id === data.event.id ? {
                    ...event, approval: data.event.approval
                } : event))
            })
            .catch(err => console.error(err))
    }

    const headerColor = currEvent.approval === 'allowed'
        ? 'bg-green-600' : currEvent.approval === 'rejected'
            ? 'bg-red-500' : 'bg-blue-500'

    return (
        <Card className="w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
            <CardHeader className={`${headerColor} text-gray-100 p-4`}>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold">{currEvent.event_name}</CardTitle>
                        <CardDescription className="text-sm text-gray-200">{currEvent.description}</CardDescription>
                    </div>

                    {userId === 1 &&
                        <div className="flex space-x-2">
                            {currEvent.approval !== 'allowed' &&
                                <Button className="border-2 border-green-500"
                                        onClick={() => submitChange('allowed')}>
                                    Approve
                                </Button>
                            }

                            {currEvent.approval !== 'rejected' &&
                                <Button className="border-2 border-red-500"
                                        onClick={() => submitChange('rejected')}>
                                    Reject
                                </Button>
                            }
                        </div>
                    }
                </div>
            </CardHeader>

            <CardContent className="p-4 text-left">
                {userId && currEvent.owners &&
                    <div className="flex flex-wrap items-center space-x-1">
                        <p className="text-sm text-gray-700">Organizers:</p>
                        {currEvent.owners.map(owner => (
                            <div key={owner.id} className="flex items-center space-x-2">
                                <span>{owner.name}</span>
                            </div>
                        ))}
                    </div>
                }
                <p className="flex justify-end items-center text-gray-700">
                    <span className="mr-2"><CalendarIcon/></span>
                    <span className="text-sm mr-2">Date:</span>
                    <span>{currEvent.date} at</span>
                    <span className="ml-1 font-semibold">
                        {currEvent.time}
                    </span>
                </p>

                {currEvent.venue_name && <p className="text-lg text-gray-700">{currEvent.venue_name}</p>}

                <div className="text-sm text-gray-700">
                    {currEvent.street1 && <p>{currEvent.street1}</p>}
                    {currEvent.street2 && <p>{currEvent.street2}</p>}
                    {currEvent.city &&
                        <p>{currEvent.city}, {currEvent.state} {currEvent.zipcode}, {currEvent.country}</p>}
                    {currEvent.capacity && <p>Capacity: {currEvent.capacity}</p>}
                    {currEvent.categories &&
                        <p className="text-right">Categories: {currEvent.categories?.map(({name}) => name).join(', ')}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
