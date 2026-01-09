import type {OptionItemType} from "~/models/models";
import {useState} from "react";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import type {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {type Dayjs} from "dayjs";


const ButtonStyle = "px-2 py-1 border border-blue-400 text-xs font-medium rounded-full cursor-pointer"
const ButtonActiveStyle = "border-blue-400 bg-blue-500 text-white cursor-pointer"
const TODAY = new Date();
const LAST_WEEK = new Date()
LAST_WEEK.setDate(TODAY.getDate() - 7);

console.log({
    TODAY,
    LAST_WEEK,
})
const items : OptionItemType[] = [
    { label: "Three days", value: -3 },
    { label: "Five days", value: -5 },
    { label: "Last week", value: -7 },
    { label: "Last month", value: -30 },
];

const Filters = ({onClickFilter} : {
    onClickFilter: (from: string|number, to: string|number) => void
}) => {

    const [showModal, setShowModal] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<OptionItemType | null>(items[2]);
    const [rangeValue, setRangeValue] = useState<DateRange<Dayjs>>([
        dayjs(LAST_WEEK.toString()),
        dayjs(TODAY.toDateString())
    ]);

    const diffDates = (fecha: Date|string) => {
        const d = new Date(fecha);
        const msPerDay: number = 1000 * 60 * 60 * 24;
        return Math.round(((d.getTime() - TODAY.getTime()) / msPerDay));
    }

    return  <div className="flex gap-2 w-full justify-end p-2">
        {items.map((item) => (
            <div
                key={item.value}
                className={`${ButtonStyle} 
                    ${ currentFilter && currentFilter.value === item.value ? ButtonActiveStyle : "hover:bg-gray-500"}`}
                onClick={() => {
                    onClickFilter(item.value, 0);
                    setCurrentFilter(item)
                }}
            >
                {item.label}
            </div>
        ))}

        <div
            className={`${ButtonStyle} 
            ${ currentFilter && currentFilter.value === "custom" ? ButtonActiveStyle : "hover:bg-gray-500"}`}
            onClick={() => {
                setShowModal(true);
            }}
        >
            Custom
        </div>

        <div className={`fixed inset-0 z-50 flex items-center justify-center text-gray-600 ${showModal ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-transparent bg-opacity-50" onClick={() => setShowModal(false)} />
            <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-2xl p-6 z-10 ">
                <h3 className="text-lg font-medium mb-4 ">Custom filters</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const start = rangeValue[0]?.toISOString();
                    const end = rangeValue[1]?.toISOString();

                    if (start && end) {
                        const startDate = diffDates(start);
                        const endDate = diffDates(end);
                        onClickFilter(startDate, endDate);
                    }
                    setShowModal(false);
                    setCurrentFilter({label: "custom", value: "custom"});
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateRangePicker']}>
                            <DateRangePicker
                                value={rangeValue}
                                onChange={(newValue) => setRangeValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" className={`${ButtonStyle} bg-gray-200`} onClick={() => {
                            setShowModal(false);
                            setCurrentFilter(items[2]);
                            onClickFilter(-7, 0);
                        }}>
                            Cancel
                        </button>
                        <button type="submit" className={`${ButtonStyle} ${ButtonActiveStyle}`}>
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default Filters

