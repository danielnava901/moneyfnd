import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import type { CountryType } from "~/models/models";

interface ExchangeDisplayProps {
    country: CountryType|null;
    loading: boolean;
}

export default function ExchangeDisplay({ country, loading }: ExchangeDisplayProps) {

    if (!country) {
        return null;
    }

    return (
        <div className="border-l border-slate-700 pl-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="text-blue-400">
                    <DollarSign className="w-7 h-7" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Exchange Rate</h2>
                    <p className="text-sm text-slate-400">USD to {country.name}</p>
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse">
                    <div className="h-16 bg-slate-800 rounded mb-4"></div>
                    <div className="h-6 bg-slate-800 rounded w-1/2"></div>
                </div>
            ) : (
                <>
                    <div className="mb-10">
                        <div className="flex items-baseline gap-3 mb-3">
                              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400
                                to-emerald-400 bg-clip-text text-transparent">
                                {country.symbol} {country.value.toFixed(2)}
                              </span>
                            <span className="text-xl text-slate-400">{country.code}</span>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}
