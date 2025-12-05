type CountryType = {
    id: number;
    name: string;
    symbol: string;
    code: string;
    value: number;
    updatedAt: string;
}

type OptionItemType = {
    id?: number|null;
    label: string;
    value: number|string;
}

export type {
    CountryType,
    OptionItemType
}