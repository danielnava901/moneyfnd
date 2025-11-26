import {useEffect, useState} from "react";

const useRates = (code: string) => {
    const [rates, setData] = useState<any[]| null>(null);
    const [loadingRate, setLoadingData] = useState(false);

    const getData = async () => {

        try {
            setLoadingData(true);
            const response = await fetch("http://localhost:9992/currency/"+code+"/history");

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
    }, [code]);

    return {
        rates,
        loadingRate
    }
}

export default useRates;