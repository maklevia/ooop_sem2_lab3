# Merge Sort Algorithm Demo

A Node.js TypeScript project demonstrating sequential and parallel implementations of the Merge Sort algorithm using the Strategy design pattern and Node.js Worker Threads.

## Features

- **Sequential Merge Sort**: Classic recursive divide-and-conquer implementation
- **Parallel Merge Sort**: Multithreaded version using Node.js Worker Threads
- **Strategy Pattern**: Clean interface for swapping between implementations
- **Performance Benchmarking**: Compare execution times and speedup
- **Testing**: Unit tests covering various edge cases

## Performance Analysis

### Expected Results
- **Small arrays (<1000 elements)**: Sequential is faster due to worker thread overhead
- **Large arrays (>10000 elements)**: Parallel shows 2-4x speedup with 4 workers
- **Optimal worker count**: Usually 4-8 workers for most systems

### Sample Output
```
Merge Sort Performance Benchmark
==================================================

Testing with 100,000 elements
----------------------------------------

Sequential Merge Sort:
  Execution time: 45 ms
  First 5 elements: [12, 34, 56, 78, 90]

Parallel Merge Sort (4 workers):
  Execution time: 12 ms
  Speedup: 3.75x
  Efficiency: 93.8%
  First 5 elements: [12, 34, 56, 78, 90]
  Correctness: PASS
```

## Architecture

### Strategy Pattern Implementation
```typescript
// Interface for sorting algorithms
interface ISorter {
  sort(data: number[]): Promise<number[]>;
  getName(): string;
  getImplementationType(): 'sequential' | 'parallel';
}

// Usage example
const sorter: ISorter = new ParallelMergeSort(4);
const result = await sorter.sort(data);
```

### Parallel Processing
- **Array Segmentation**: Splits input into equal-sized chunks
- **Worker Threads**: Each worker sorts a segment independently
- **Merge Phase**: Combines sorted segments using divide-and-conquer
- **Overhead Management**: Falls back to sequential for small arrays

## Testing

### Test Coverage
- **Empty arrays**: Verify handling of edge cases
- **Single elements**: Test minimal input
- **Already sorted**: Verify stability
- **Reverse sorted**: Test worst-case scenario
- **Duplicates**: Ensure correct handling
- **Large arrays**: Performance and correctness
- **Negative numbers**: Edge case handling

## Configuration

### Worker Thread Configuration
```typescript
const sorter = new ParallelMergeSort(4); // 4 worker threads
```

### Benchmark Configuration
The benchmark suite tests:
- **Array sizes**: 1,000, 100,000, 1,000,000 elements
- **Worker threads**: 2, 4, 8 workers
- **Performance metrics**: Execution time, speedup, efficiency
