import { SequentialMergeSort } from './algorithms/SequentialMergeSort';
import { ParallelMergeSort } from './algorithms/ParallelMergeSort';
import { ISorter } from './interfaces/ISorter';

/**
 * Demonstrates the Strategy pattern by using different sorting implementations.
 * @param sorter - The sorting algorithm to use
 * @param data - The data to sort
 */
async function demonstrateSorting(sorter: ISorter, data: number[]): Promise<void> {
    console.log(`\n${sorter.getName()}`);
    console.log(`Implementation: ${sorter.getImplementationType()}`);

    const startTime = Date.now();
    const sortedData = await sorter.sort(data);
    const endTime = Date.now();

    console.log(`Execution time: ${endTime - startTime} ms`);
    console.log(`Original length: ${data.length}`);
    console.log(`Sorted length: ${sortedData.length}`);
    console.log(`First 10 elements: [${sortedData.slice(0, 10).join(', ')}]`);
    console.log(`Last 10 elements: [${sortedData.slice(-10).join(', ')}]`);
}

/**
 * Main function that demonstrates both sorting implementations.
 */
async function main(): Promise<void> {
    console.log('Merge Sort Algorithm Demo');
    console.log('==================================================');
    console.log('This demo showcases sequential vs parallel implementations');
    console.log('of the Merge Sort algorithm using Node.js Worker Threads.\n');

    // Generate test data
    const testData = [64, 34, 25, 12, 22, 11, 90, 88, 76, 54, 43, 32, 21, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    console.log(`Test data: [${testData.join(', ')}]`);

    try {
        // Demonstrate sequential implementation
        const sequentialSorter = new SequentialMergeSort();
        await demonstrateSorting(sequentialSorter, testData);

        // Demonstrate parallel implementation
        const parallelSorter = new ParallelMergeSort(4);
        await demonstrateSorting(parallelSorter, testData);

        // Verify both implementations produce the same result
        const sequentialResult = await sequentialSorter.sort(testData);
        const parallelResult = await parallelSorter.sort(testData);

        const isCorrect = JSON.stringify(sequentialResult) === JSON.stringify(parallelResult);
        console.log(`\nCorrectness check: ${isCorrect ? 'PASS' : 'FAIL'}`);

        if (isCorrect) {
            console.log('Both implementations produce identical results!');
        } else {
            console.log('Results differ between implementations!');
        }

        console.log('\nDemo completed successfully!');
        console.log('==================================================');
        console.log('Run "npm run benchmark" for performance comparison');
        console.log('Run "npm test" for unit tests');

    } catch (error) {
        console.error('Demo failed:', error);
        throw error;
    }
}

// Run demo if this file is executed directly
if (require.main === module) {
    main().catch(error => {
        console.error('Demo failed:', error);
        process.exit(1);
    });
}

export { main };