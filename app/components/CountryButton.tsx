import type {CountryType} from "~/models/models";

const CountryButton = (
    {
        country,
        onClick,
        isSelected = false,
    }: { country: CountryType,
        onClick: () => void,
        isSelected: boolean
    }) => {
    return <div className={
        `rounded-xl border-2 border-blue-600 py-0 px-3
        hover:opacity-75 cursor-pointer hover:bg-gray-300
        text-xs font-medium
        ${isSelected && "bg-sky-300"}
        `
    }
    onClick={onClick}
    >
        {country.code}
    </div>
}

export default CountryButton