export function validateStringLengthRange(str: string, min: number, max: number): boolean {
    // Making sure there's no negatives
    min = min < 0 ? 0 : min
    max = max < 0 ? 0 : max

    // Swaping values if min is less than max
    if (min > max) {
        max = [min, min = max][0]
    }

    return str.length >= min && str.length <= max
}