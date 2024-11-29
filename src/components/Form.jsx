import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from './Button.jsx';
import BackButton from './BackButton.jsx';
import {useUrlPosition} from '../hooks/useUrlPosition.js';
import Message from './Message.jsx';
import Spinner from './Spinner.jsx';
import DatePicker from 'react-datepicker';
import {useCities} from '../context/CitiesContext.jsx';
import {useNavigate} from 'react-router-dom';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const {createCity, isLoading} = useCities();
    const [lat, lng] = useUrlPosition();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [geoCodingError, setGeocodingError] = useState('');
    const [emoji, setEmoji] = useState('');

    useEffect(() => {
        if (!lat && !lng) {
            return;
        }

        async function fetchCityData() {
            try {
                setGeocodingError('');
                setIsLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}/?latitude=${lat}&longtitude=${lng}`);
                const data = await res.json();
                if (!data.countryCode) {
                    throw new Error('Not a city selected. Click somewhere else!')
                }
                setCityName(data.city || data.locality || '');
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (e) {
                setGeocodingError(e.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) {
            return;
        }
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng},
        };
        await createCity(newCity);
        navigate('/app/cities');
    }

    if (geoCodingError) {
        return <Message message={geoCodingError}/>;
    }

    if (!lat && !lng) {
        return <Message message="Start by clicking at the map!"/>;
    }

    if (isLoadingGeocoding) {
        return <Spinner/>;
    }

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker dateFormat="dd/MM/yyy" id="date" selected={date} onChange={(date) => setDate(date)}
                            showMonthYearDropdown/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
