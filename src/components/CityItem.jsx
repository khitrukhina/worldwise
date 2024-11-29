import styles from './CityItem.module.css';
import {Link} from 'react-router-dom';
import {useCities} from '../context/CitiesContext.jsx';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export default function CityItem({city}) {
    const {currentCity, deleteCity} = useCities();
    const {id, cityName, emoji, date, position} = city;

    function handleClick(e) {
        e.preventDefault();
        deleteCity(id);
    }

    return <li>
        <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}
              className={`${styles.cityItem} ${city.id === currentCity.id ? styles['cityItem--active'] : ''}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button onClick={handleClick} className={styles.deleteBtn}>&times;</button>
        </Link>
    </li>;
}