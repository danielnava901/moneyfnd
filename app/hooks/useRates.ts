import {useEffect, useState} from "react";
import {URL_API} from "~/constants";

const useRates = (code: string, filter: string|null) => {
    const [rates, setData] = useState<any[]| null>(null);
    const [loadingRate, setLoadingData] = useState(false);

    const getData = async () => {

        try {
            setLoadingData(true);
            let queryString = `${filter}`.trim().length > 0 ? `?d=${filter}` : "";
            const response = await fetch(`${URL_API}/currency/${code}/history${queryString}`);

            let data = await response.json();
            data = data.map((item: any) => {
                return {
                    ...item,
                    value: parseFloat(item.value).toFixed(2),
                    created_at: item.created_at.slice(0, 10),
                }
            })

            setData(data);
        }catch (e: any){
            console.error(e.message);
        }finally {
            setLoadingData(false);
        }

    }
    useEffect(() => {
        getData();
    }, [code, filter]);

    return {
        rates,
        loadingRate
    }
}

export default useRates;