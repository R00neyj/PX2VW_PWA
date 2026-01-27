export function convert(input, baseWidth, precision) {
    if (!input) return "";
    
    const finalPrecision = isNaN(precision) ? 4 : Math.min(Math.max(precision, 0), 10);
    const width = parseFloat(baseWidth) || 1920;

    return input.replace(/(-?\d+\.?\d*)px/g, (match, p1) => {
        const pxValue = parseFloat(p1);
        if (pxValue === 0) return '0px';
        return parseFloat(((pxValue / width) * 100).toFixed(finalPrecision)) + 'vw';
    });
}
