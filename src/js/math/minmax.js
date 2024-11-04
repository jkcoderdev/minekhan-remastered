export function minmax(min, max, value) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
}