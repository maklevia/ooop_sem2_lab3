import { SequentialMergeSort } from './algorithms/SequentialMergeSort';
import { ParallelMergeSort } from './algorithms/ParallelMergeSort';

/**
 * Generates a random array of specified size.
 * @param size - Size of the array to generate
 * @returns Random array of numbers
 */
function generateRandomArray(size: number): number[] {
    const array: number[] = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 1000000));
    }
    return array;
}

/**
 * Measures execution time of a function.
 * @param fn - Function to measure
 * @returns Execution time in milliseconds
 */
async function measureExecutionTime<T>(fn: () => Promise<T>): Promise<{ result: T; time: number }> {
    const startTime = Date.now();
    const result = await fn();
    const endTime = Date.now();
    return { result, time: endTime - startTime };
}

/**
 * Runs performance benchmarks comparing sequential and parallel merge sort.
 */
async function runBenchmarks(): Promise<void> {
    console.log('Merge Sort Performance Benchmark');
    console.log('==================================================');

    const arraySizes = [1000, 100000, 1000000, 10000000];
    const workerThreads = [2, 4, 8];

    for (const size of arraySizes) {
        console.log(`\nTesting with ${size.toLocaleString()} elements`);
        console.log('--------------------------------------------------');

        // Generate test data
        const testData = generateRandomArray(size);
        console.log(`Generated random array of ${size.toLocaleString()} elements`);

        // Test sequential implementation
        const sequentialSorter = new SequentialMergeSort();
        const sequentialResult = await measureExecutionTime(() =>
            sequentialSorter.sort([...testData])
        );

        console.log(`\n${sequentialSorter.getName()}:`);
        console.log(`  Execution time: ${sequentialResult.time} ms`);
        console.log(`  First 5 elements: [${sequentialResult.result.slice(0, 5).join(', ')}]`);

        // Test parallel implementations with different worker counts
        for (const workers of workerThreads) {
            const parallelSorter = new ParallelMergeSort(workers);
            const parallelResult = await measureExecutionTime(() =>
                parallelSorter.sort([...testData])
            );

            const speedup = sequentialResult.time / parallelResult.time;
            const efficiency = (speedup / workers) * 100;

            console.log(`\n${parallelSorter.getName()}:`);
            console.log(`  Execution time: ${parallelResult.time} ms`);
            console.log(`  Speedup: ${speedup.toFixed(2)}x`);
            console.log(`  Efficiency: ${efficiency.toFixed(1)}%`);
            console.log(`  First 5 elements: [${parallelResult.result.slice(0, 5).join(', ')}]`);

            // Verify correctness
            const isCorrect = JSON.stringify(sequentialResult.result) === JSON.stringify(parallelResult.result);
            console.log(`  Correctness: ${isCorrect ? 'PASS' : 'FAIL'}`);
        }
    }

    console.log('\nBenchmark completed successfully!');
    console.log('==================================================');
}

// Run benchmarks if this file is executed directly
if (require.main === module) {
    runBenchmarks().catch(error => {
        console.error('Benchmark failed:', error);
        process.exit(1);
    });
}

export { runBenchmarks };