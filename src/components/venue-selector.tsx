import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {Label} from "@/components/ui/label";

export interface Venue {
    id: number;
    name: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    capacity: string;
}

interface VenueSelectorProps {
    onVenueSelect: (venue: Venue) => void
    showVenueSubmit: () => void
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({onVenueSelect, showVenueSubmit}) => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [_, setSelectedVenue] = useState<Venue | null>(null);

    // fetch existing venues
    useEffect(() => {
        fetch('https://events-server-3c0nlgv6r-wallfacers-projects.vercel.app/api/venues/list')
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(error => console.error(error));
    }, []);

    const handleSelectChange = (selectedOption: any) => {
        if (selectedOption.value === -1) {
            showVenueSubmit();
        } else {
            const venue = venues.find(v => v.id === selectedOption.value);

            setSelectedVenue(venue || null);

            if (venue) {
                onVenueSelect(venue);
            }
        }
    };

    const venueOptions = [{value: -1, label: '+ Add New Venue'}]

    venues.forEach((venue) => venueOptions.push({
        value: venue.id,
        label: venue.name
    }));

    return (
        <div>
            <Label htmlFor="venue">Select or Add Venue</Label>
            <Select
                id="venue"
                options={venueOptions}
                onChange={handleSelectChange}
                placeholder="Select a venue"
                required
            />
        </div>
    );
};

export default VenueSelector;