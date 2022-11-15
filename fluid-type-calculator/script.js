//Inputs are in pixels

function calculateFluidType(minFontSize, maxFontSize, minFontEnd, maxFontStart, unit='px') {
    const rateChange = ((100 * (maxFontSize - minFontSize)) / (maxFontStart - minFontEnd)).toFixed(3);

    const rootFontSize = ((minFontEnd * maxFontSize - maxFontStart * minFontSize) / (minFontEnd - maxFontStart)).toFixed(3);

    if (unit === 'px') {
        return `clamp(${minFontSize}px, ${rateChange}vw + ${rootFontSize}px, ${maxFontSize}px)`;
    } else if (unit === 'rem') {
        return `clamp(${(minFontSize / 16).toFixed(3)}rem, ${rateChange}vw + ${(rootFontSize / 16).toFixed(3)}rem, ${(maxFontSize / 16).toFixed(3)}rem)`;
    }
}

// console.log(calculateFluidType(64, 100, 720, 875, 'rem'))