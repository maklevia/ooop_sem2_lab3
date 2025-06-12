import { SequentialMergeSort } from '../src/algorithms/SequentialMergeSort';

describe('SequentialMergeSort', () => {
    let sorter: SequentialMergeSort;

    beforeEach(() => {
        sorter = new SequentialMergeSort();
    });

    describe('sort', () => {
        it('should sort an empty array', async () => {
            const result = await sorter.sort([]);
            expect(result).toEqual([]);
        });

        it('should sort an array with one element', async () => {
            const result = await sorter.sort([42]);
            expect(result).toEqual([42]);
        });

        it('should sort an already sorted array', async () => {
            const input = [1, 2, 3, 4, 5];
            const result = await sorter.sort(input);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('should sort a reverse-sorted array', async () => {
            const input = [5, 4, 3, 2, 1];
            const result = await sorter.sort(input);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('should sort a random array', async () => {
            const input = [3, 1, 4, 1, 5, 9, 2, 6];
            const result = await sorter.sort(input);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
        });

        it('should sort an array with duplicates', async () => {
            const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
            const result = await sorter.sort(input);
            expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
        });

        it('should sort an array with negative numbers', async () => {
            const input = [-3, 1, -4, 1, -5, 9, -2, 6];
            const result = await sorter.sort(input);
            expect(result).toEqual([-5, -4, -3, -2, 1, 1, 6, 9]);
        });

        it('should sort a large random array', async () => {
            const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
            const result = await sorter.sort(input);

            // Verify the result is sorted
            for (let i = 1; i < result.length; i++) {
                expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
            }
        });

        it('should not modify the original array', async () => {
            const original = [3, 1, 4, 1, 5];
            const input = [...original];

            await sorter.sort(input);

            expect(input).toEqual(original);
        });

        it('should handle arrays with all same values', async () => {
            const input = [5, 5, 5, 5, 5];
            const result = await sorter.sort(input);
            expect(result).toEqual([5, 5, 5, 5, 5]);
        });

        it('should handle arrays with mixed data types (numbers only)', async () => {
            const input = [3.14, 1, 2.71, 0, -1];
            const result = await sorter.sort(input);
            expect(result).toEqual([-1, 0, 1, 2.71, 3.14]);
        });
    });

    describe('getName', () => {
        it('should return the correct algorithm name', () => {
            expect(sorter.getName()).toBe('Sequential Merge Sort');
        });
    });

    describe('getImplementationType', () => {
        it('should return sequential', () => {
            expect(sorter.getImplementationType()).toBe('sequential');
        });
    });
});