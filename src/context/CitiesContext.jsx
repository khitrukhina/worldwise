import {createContext, useContext, useEffect, useReducer} from 'react';

const url = 'http://localhost:9000'
const CitiesContext = createContext();

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                idLoading: true,
            };
        case 'cities/loaded':
            return {
                ...state,
                idLoading: false,
                cities: action.payload,
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case 'city/deleted':
            return {
                ...state,
                cities: state.cities.filter(c => c.id !== action.payload),
                currentCity: state.currentCity?.id === action.payload ? {} : state.currentCity,
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
            };
        default:
            throw new Error('Unknown action');
    }
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                dispatch({type: 'loading'});
                const res = await fetch(`${url}/cities`);
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data})
            } catch (e) {
                dispatch({type: 'rejected', payload: e});
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        if (+id === currentCity.id) {
            return;
        }
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${url}/cities/${id}`);
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data});
        } catch (e) {
            dispatch({type: 'rejected', payload: e});
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${url}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({type: 'city/deleted', payload: id});
        } catch (e) {
            dispatch({type: 'rejected', payload: e});
        }
    }

    async function createCity(city) {
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${url}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data});

        } catch (e) {
            dispatch({type: 'rejected', payload: e});
        }
    }

    return <CitiesContext.Provider value={{error, deleteCity, createCity, cities, isLoading, getCity, currentCity}}>
        {children}
    </CitiesContext.Provider>;
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error('CitiesContext used outside CitiesProvider');
    }

    return context;
}

export {CitiesProvider, useCities};