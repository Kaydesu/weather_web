import React, { useLayoutEffect, useState } from 'react';

export const useWindowResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        const updateWidth = () => {
            let resize = window.innerWidth;
            setWidth(resize);
        }
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return (() => {
            window.removeEventListener("resize", updateWidth);
        })
    }, [width]);
    return width;
}