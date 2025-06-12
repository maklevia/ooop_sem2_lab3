import { ISorter } from '../interfaces/ISorter';

/**
 * Sequential implementation of the Merge Sort algorithm.
 * Uses standard recursive divide-and-conquer approach running in a single thread.
 */
export class SequentialMergeSort implements ISorter {
    /**
     * Sorts an array using sequential merge sort.
     * @param data - The array to be sorted
     * @returns Promise that resolves to the sorted array
     */
    public async sort(data: number[]): Promise<number[]> {
        // Create a copy to avoid mutating the original array
        const dataCopy = [...data];
        return this.mergeSort(dataCopy);
    }

    /**
     * Gets the name of the algorithm.
     * @returns The algorithm name
     */
    public getName(): string {
        return 'Sequential Merge Sort';
    }

    /**
     * Gets the implementation type.
     * @returns The implementation type
     */
    public getImplementationType(): 'sequential' | 'parallel' {
        return 'sequential';
    }

    /**
     * Recursive merge sort implementation.
     * @param arr - The array to sort
     * @returns The sorted array
     */
    private mergeSort(arr: number[]): number[] {
        // Base case: arrays of length 0 or 1 are already sorted
        if (arr.length <= 1) {
            return arr;
        }

        // Divide: split the array into two halves
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        // Conquer: recursively sort the two halves
        const sortedLeft = this.mergeSort(left);
        const sortedRight = this.mergeSort(right);

        // Combine: merge the sorted halves
        return this.merge(sortedLeft, sortedRight);
    }

    /**
     * Merges two sorted arrays into a single sorted array.
     * @param left - The left sorted array
     * @param right - The right sorted array
     * @returns The merged sorted array
     */
    private merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        // Compare elements from both arrays and merge them in sorted order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Add remaining elements from left array
        while (leftIndex < left.length) {
            result.push(left[leftIndex]);
            leftIndex++;
        }

        // Add remaining elements from right array
        while (rightIndex < right.length) {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        return result;
    }
}