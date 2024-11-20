import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import CountryItem from './CountryItem.jsx';

export default function CountryList({isLoading, cities}) {
    if (isLoading) {
        return <Spinner/>;
    }
    if (!cities.length) {
        return <Message message='Add your first city by clicking on a city on the map 🌆'/>;
    }

    const countries = cities.reduce((acc, city) => {
        if (!acc.map(el => el.city).includes(city.country)) {
            return [...acc, {country: city.country, emoji: city.emoji}]
        }
        return acc;
    }, []);

    return <ul className={styles.cityList}>
        {countries.map(country => {
            return <CountryItem key={country.country} country={country}/>;
        })}
    </ul>
}
