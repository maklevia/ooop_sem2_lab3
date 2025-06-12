import { parentPort } from 'worker_threads';

/**
 * Worker thread implementation for parallel merge sort.
 * Receives array segments and returns sorted results.
 */

interface WorkerMessage {
    type: 'sort';
    data: number[];
    segmentId: number;
}

interface WorkerResult {
    type: 'sorted';
    data: number[];
    segmentId: number;
}

/**
 * Recursive merge sort implementation for worker threads.
 * @param arr - The array to sort
 * @returns The sorted array
 */
function mergeSort(arr: number[]): number[] {
    // Base case: arrays of length 0 or 1 are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Divide: split the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Conquer: recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Combine: merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * @param left - The left sorted array
 * @param right - The right sorted array
 * @returns The merged sorted array
 */
function merge(left: number[], right: number[]): number[] {
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

// Listen for messages from the main thread
if (parentPort) {
    parentPort.on('message', (message: WorkerMessage) => {
        if (message.type === 'sort') {
            const sortedData = mergeSort(message.data);

            const result: WorkerResult = {
                type: 'sorted',
                data: sortedData,
                segmentId: message.segmentId
            };

            parentPort!.postMessage(result);
        }
    });
}