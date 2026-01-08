import {useEffect, useState} from "react";
import {URL_API} from "~/constants";

const useRates = (code: string, from: string|number, to: string|number) => {
    const [rates, setData] = useState<any[]| null>(null);
    const [loadingRate, setLoadingData] = useState(false);

    const getData = async () => {

        try {
            setLoadingData(true);
            let queryString = `${from}`.trim().length > 0 ? `?d=${from}` : "";
            queryString += `${to}`.trim().length > 0 ? `&h=${to}` : "";
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
    }, [code, from, to]);

    return {
        rates,
        loadingRate
    }
}

export default useRates;