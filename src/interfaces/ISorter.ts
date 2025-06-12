/**
 * Interface for sorting algorithms implementing the Strategy pattern.
 * Provides a common contract for both sequential and parallel sorting implementations.
 */
export interface ISorter {
    /**
     * Sorts an array of numbers.
     * @param data - The array to be sorted
     * @returns Promise that resolves to the sorted array
     */
    sort(data: number[]): Promise<number[]>;

    /**
     * Gets the name of the sorting algorithm.
     * @returns The algorithm name
     */
    getName(): string;

    /**
     * Gets the implementation type (sequential or parallel).
     * @returns The implementation type
     */
    getImplementationType(): 'sequential' | 'parallel';
}