import { useState, useEffect } from "react";

function getWindowSize() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function updateSize() {
        setWindowSize(getWindowSize());
    }

    useEffect(() => {
        window.onresize = updateSize;
    }, []);

    return windowSize;
}
