import {useEffect, useState} from "react";
import type {CountryType} from "~/models/models";

const useCountries = () => {
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [loading, setLoading] = useState(false);

    const getCountries = async () => {

        try {
            setLoading(true);
            const responseCountries = await fetch("http://localhost:9992/countries", {
                method: "GET",
            });

            const data = await responseCountries.json();
            setCountries(data);
        }catch(e: any) {
            console.error(e.message);
        }finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getCountries();
    }, []);

    return {
        loading,
        countries,
    }
}

export default useCountries;