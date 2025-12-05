import type {OptionItemType} from "~/models/models";

const ButtonStyle = "px-2 py-1 border border-blue-400 text-xs font-medium rounded-full cursor-pointer"
const ButtonActiveStyle = "border-blue-400 bg-blue-500 text-white cursor-pointer"

const items : OptionItemType[] = [
    { label: "Three days", value: 3 },
    { label: "Five days", value: 5 },
    { label: "Last week", value: 7 },
    { label: "Last month", value: 30 },
];

const Filters = ({onClickFilter, currentFilter} : {
    onClickFilter: (date: string, item: OptionItemType) => void,
    currentFilter: OptionItemType|null
}) => {

    const onClick = (filter: OptionItemType): void => {
        const f = new Date();
        f.setDate(f.getDate() - Number(filter.value));
        onClickFilter(f.toISOString().split("T")[0], filter)
    }

    return  <div className="flex gap-2 w-full justify-end p-2">
        {items.map((item) => (
            <div
                key={item.value}
                className={`${ButtonStyle} 
                    ${ currentFilter && currentFilter.value === item.value ? ButtonActiveStyle : "hover:bg-gray-500"}`}
                onClick={() => onClick(item)}
            >
                {item.label}
            </div>
        ))}
    </div>
}

export default Filters