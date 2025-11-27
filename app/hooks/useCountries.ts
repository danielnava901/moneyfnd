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

            let data = await responseCountries.json();
            data = [
                ...data.filter((item: any) => item.code === "MXN"),
                ...data.filter((item: any) => item.code !== "MXN")
            ];

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