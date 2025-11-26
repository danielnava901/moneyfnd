import {useState} from "react";
import type {CountryType} from "~/models/models";
import CountryButton from "~/components/CountryButton";
import useCountries from "~/hooks/useCountries";
import useRates from "~/hooks/useRates";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const initCountry : CountryType = {
    id: 1,
    symbol: "$",
    value: 0,
    code: "MXN",
    name: "México",
    updatedAt: ""
}

const Money = () => {
    const [currentCountry, setCountry] = useState<CountryType>(initCountry);
    const {countries} = useCountries();
    const {rates, loadingRate} = useRates(currentCountry?.code);
    console.log({rates, loadingRate});

    return <div className="bg-sky-100 h-[100vh] w-[100vw]">
        <div className="flex items-center gap-2 w-max-[900vw] overflow-y-auto py-3">
            {
                countries.map((country: CountryType) => {
                    return <CountryButton
                        key={country.code}
                        country={country}
                        isSelected={country.code === currentCountry?.code}
                        onClick={() => {
                            setCountry(country);
                        }}
                    />
                })
            }
        </div>

        <div className="flex items-center justify-between h-full">
            <div className="w-3/12">
                precio hoy
            </div>
            {
                !loadingRate && rates && rates.length > 0 && (
                    <ResponsiveContainer width="100%" height={600}>
                        <LineChart data={rates}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="created_at" />
                            <YAxis domain={['dataMin - 0.19', 'dataMax + 0.19']}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    </div>;
}

export default Money;