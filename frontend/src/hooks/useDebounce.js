import { useEffect, useState } from "react";

export function useDebounce(inputValue) {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, 500)
        return () => clearTimeout(timer)
    }, [inputValue])

    return debouncedValue
}