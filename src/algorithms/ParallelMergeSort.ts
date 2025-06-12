import { Worker } from 'worker_threads';
import { ISorter } from '../interfaces/ISorter';
import * as path from 'path';

/**
 * Parallel implementation of the Merge Sort algorithm.
 * Uses Worker Threads to sort array segments concurrently.
 */
export class ParallelMergeSort implements ISorter {
    private workerThreads: number;

    /**
     * Creates a new parallel merge sort instance.
     * @param workerThreads - Number of worker threads to use (default: 4)
     */
    constructor(workerThreads: number = 4) {
        this.workerThreads = workerThreads;
    }

    /**
     * Sorts an array using parallel merge sort.
     * @param data - The array to be sorted
     * @returns Promise that resolves to the sorted array
     */
    public async sort(data: number[]): Promise<number[]> {
        // For small arrays, use sequential sort to avoid overhead
        if (data.length < 1000) {
            const sequentialSorter = new (await import('./SequentialMergeSort')).SequentialMergeSort();
            return await sequentialSorter.sort(data);
        }

        return this.parallelMergeSort(data);
    }

    /**
     * Gets the name of the algorithm.
     * @returns The algorithm name
     */
    public getName(): string {
        return `Parallel Merge Sort (${this.workerThreads} workers)`;
    }

    /**
     * Gets the implementation type.
     * @returns The implementation type
     */
    public getImplementationType(): 'sequential' | 'parallel' {
        return 'parallel';
    }

    /**
     * Performs parallel merge sort using worker threads.
     * @param data - The array to sort
     * @returns Promise that resolves to the sorted array
     */
    private async parallelMergeSort(data: number[]): Promise<number[]> {
        // Split the array into segments for parallel processing
        const segments = this.splitArray(data, this.workerThreads);

        // Create workers and sort segments in parallel
        const workerPromises = segments.map((segment, index) =>
            this.sortSegment(segment, index)
        );

        // Wait for all workers to complete
        const sortedSegments = await Promise.all(workerPromises);

        // Merge all sorted segments
        return this.mergeSortedSegments(sortedSegments);
    }

    /**
     * Splits an array into equal-sized segments.
     * @param data - The array to split
     * @param numSegments - Number of segments to create
     * @returns Array of array segments
     */
    private splitArray(data: number[], numSegments: number): number[][] {
        const segments: number[][] = [];
        const segmentSize = Math.ceil(data.length / numSegments);

        for (let i = 0; i < numSegments; i++) {
            const start = i * segmentSize;
            const end = Math.min(start + segmentSize, data.length);

            if (start < data.length) {
                segments.push(data.slice(start, end));
            }
        }

        return segments;
    }

    /**
     * Sorts a single array segment using a worker thread.
     * @param segment - The array segment to sort
     * @param segmentId - Unique identifier for the segment
     * @returns Promise that resolves to the sorted segment
     */
    private async sortSegment(segment: number[], segmentId: number): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(path.join(__dirname, '../../dist/workers/mergeSortWorker.js'), {
                workerData: { segmentId }
            });

            worker.on('message', (result: any) => {
                if (result.type === 'sorted' && result.segmentId === segmentId) {
                    worker.terminate();
                    resolve(result.data);
                }
            });

            worker.on('error', (error: Error) => {
                worker.terminate();
                reject(error);
            });

            worker.on('exit', (code: number) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });

            // Send the segment to the worker for sorting
            worker.postMessage({
                type: 'sort',
                data: segment,
                segmentId
            });
        });
    }

    /**
     * Merges multiple sorted segments into a single sorted array.
     * @param sortedSegments - Array of sorted segments
     * @returns The merged sorted array
     */
    private mergeSortedSegments(sortedSegments: number[][]): number[] {
        if (sortedSegments.length === 1) {
            return sortedSegments[0];
        }

        // Use a divide-and-conquer approach to merge segments
        const mergeTwoSegments = (left: number[], right: number[]): number[] => {
            const result: number[] = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] <= right[rightIndex]) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }

            // Add remaining elements
            while (leftIndex < left.length) {
                result.push(left[leftIndex]);
                leftIndex++;
            }

            while (rightIndex < right.length) {
                result.push(right[rightIndex]);
                rightIndex++;
            }

            return result;
        };

        // Merge segments pairwise until we have one final sorted array
        let currentSegments = [...sortedSegments];

        while (currentSegments.length > 1) {
            const mergedSegments: number[][] = [];

            for (let i = 0; i < currentSegments.length; i += 2) {
                if (i + 1 < currentSegments.length) {
                    mergedSegments.push(mergeTwoSegments(currentSegments[i], currentSegments[i + 1]));
                } else {
                    mergedSegments.push(currentSegments[i]);
                }
            }

            currentSegments = mergedSegments;
        }

        return currentSegments[0];
    }
}