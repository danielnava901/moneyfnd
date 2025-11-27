import {useEffect, useRef, useState} from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type {CountryType} from "~/models/models";

const Carousel = (
{
    countries,
    onSelectCountry,
    selectedCountry,
} : any) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 300;
        const newPosition = direction === 'left'
            ? Math.max(0, scrollPosition - scrollAmount)
            : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

        container.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScrollPosition(newPosition);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setScrollPosition(container.scrollLeft);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3
                hover:bg-slate-800 transition-colors rounded-lg"
                disabled={scrollPosition === 0}
            >
                <ChevronLeft className="w-6 h-6 text-slate-300 hover:text-white" />
            </button>

            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {countries.map((country : CountryType) => (
                    <button
                        key={country.code}
                        onClick={() => onSelectCountry(country)}
                        className={`flex-shrink-0 flex flex-col items-center
                            px-6 py-2 transition-all border-b-2 cursor-pointer ${
                            selectedCountry?.code === country.code
                                ? 'border-blue-400'
                                : 'border-transparent hover:border-slate-600'
                        }`}
                    >
                        <div className="text-md">{country.symbol}</div>
                        <div className="text-center">
                            <div className="font-semibold text-white text-sm">{country.name}</div>
                            <div className="text-xs text-slate-400">{country.value.toFixed(2)}</div>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 hover:bg-slate-800 transition-colors rounded-lg"
            >
                <ChevronRight className="w-6 h-6 text-slate-300 hover:text-white" />
            </button>
        </div>
    );
}

export default Carousel;