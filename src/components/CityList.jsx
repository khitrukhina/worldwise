import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import CityItem from './CityItem.jsx';
import Message from './Message.jsx';

export default function CityList({isLoading, cities}) {
    if (isLoading) {
        return <Spinner/>;
    }
    if (!cities.length) {
        return <Message message='Add your first city by clicking on a city on the map 🌆'/>;
    }
    return <ul className={styles.cityList}>
        {cities.map(city => {
            return <CityItem key={city.id} city={city}/>;
        })}
    </ul>
}