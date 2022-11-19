//Inputs are in pixels
const minFontSize = document.querySelector('.minFontSize');

const maxFontSize = document.querySelector('.maxFontSize');

const minFontEnd = document.querySelector('.minFontEnd');

const maxFontStart = document.querySelector('.maxFontStart');

const units = document.querySelectorAll('[type="radio"]');

function getSelectedUnit(units) {
    return [...units].filter(unit => unit.checked)[0].value;
}

const button = document.querySelector('button');

button.addEventListener('click', () => {
    const unit = getSelectedUnit(units);
    
    const result = calculateFluidType(minFontSize.value, maxFontSize.value, minFontEnd.value, maxFontStart.value, unit)

    const p = document.querySelector('.answer');
    p.textContent = result;
})

function calculateFluidType(minFontSize, maxFontSize, minFontEnd, maxFontStart, unit='px') {
    const rateChange = ((100 * (maxFontSize - minFontSize)) / (maxFontStart - minFontEnd)).toFixed(3);

    const rootFontSize = (((minFontEnd * maxFontSize) - (maxFontStart * minFontSize)) / (minFontEnd - maxFontStart)).toFixed(3);

    if (unit === 'px') {
        return `clamp(${minFontSize}px, ${rateChange}vw + ${rootFontSize}px, ${maxFontSize}px)`;
    } else if (unit === 'rem') {
        return `clamp(${(minFontSize / 16).toFixed(3)}rem, ${rateChange}vw + ${(rootFontSize / 16).toFixed(3)}rem, ${(maxFontSize / 16).toFixed(3)}rem)`;
    }
}

console.log(calculateFluidType(28, 58, 720, 1050, 'rem'))

//clamp(28px, 9.091vw + -37.455px, 58px)
// clamp(1.750rem, 9.091vw + -2.341rem, 3.625rem)