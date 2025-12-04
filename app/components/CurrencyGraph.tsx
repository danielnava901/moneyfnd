import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const CurrencyGraph = ({data} : any) => {
    return <ResponsiveContainer height={600}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                tickFormatter={(value) => {
                    console.log({value})
                    return new Intl.DateTimeFormat("es-MX", {
                        month: "short",
                        day: "numeric",
                    }).format(new Date(value + "T00:00:00"));
                }}
                dataKey="created_at"
            />
            <YAxis
                tickFormatter={(value) => value.toFixed(2)}
                domain={['dataMin - 0.1', 'dataMax + 0.1']}/>
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    </ResponsiveContainer>
}

export default CurrencyGraph;