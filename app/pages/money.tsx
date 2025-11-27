import {useEffect, useState} from "react";
import type {CountryType} from "~/models/models";
import CountryButton from "~/components/CountryButton";
import useCountries from "~/hooks/useCountries";
import useRates from "~/hooks/useRates";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Carousel from "~/components/Carousel";
import CurrencyGraph from "~/components/CurrencyGraph";
import ExchangeDisplay from "~/components/ExchangeDisplay";

const initValue : CountryType = {
    id: 1,
    symbol: "$",
    value: 0,
    code: "MXN",
    name: "México",
    updatedAt: ""
}

const Money = () => {
    const {countries} = useCountries();
    const [currentCountry, setCountry] = useState<CountryType|null>(null);

    useEffect(() => {
        if (countries.length > 0 && !currentCountry) {
            const mxnCountry = countries.find(c => c.code === "MXN");
            if (mxnCountry) setCountry(mxnCountry);
        }
    }, [countries, currentCountry]);

    const {rates, loadingRate} = useRates(currentCountry?.code  || "MXN");

    return <div className="min-h-screen bg-slate-950 text-gray-200">
        <div className="container mx-auto px-4 py-6">
            <Carousel
                countries={countries}
                selectedCountry={currentCountry}
                onSelectCountry={(country : CountryType) => {
                    setCountry(country);
                }}
            />

            <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 mt-12 grid-rows-1">
                <div className="lg:col-span-3 col-span-1">
                    <ExchangeDisplay
                        country={currentCountry}
                        loading={loadingRate}
                    />
                </div>

                <div className="lg:col-span-9 lg:p-8 col-span-1">
                    {
                        !loadingRate && rates && rates.length > 0 && (
                            <CurrencyGraph data={rates} />
                        )
                    }
                </div>

            </div>
        </div>
    </div>;
}

export default Money;