# Merge Sort Algorithm Demo

A Node.js TypeScript project demonstrating sequential and parallel implementations of the Merge Sort algorithm using the Strategy design pattern and Node.js Worker Threads.

## Features

- **Sequential Merge Sort**: Classic recursive divide-and-conquer implementation
- **Parallel Merge Sort**: Multithreaded version using Node.js Worker Threads
- **Strategy Pattern**: Clean interface for swapping between implementations
- **Performance Benchmarking**: Compare execution times and speedup
- **Comprehensive Testing**: Unit tests covering various edge cases
- **Object-Oriented Design**: Clean, encapsulated, and maintainable code

## Project Structure

```
├── src/
│   ├── interfaces/
│   │   └── ISorter.ts              # Strategy pattern interface
│   ├── algorithms/
│   │   ├── SequentialMergeSort.ts  # Sequential implementation
│   │   └── ParallelMergeSort.ts    # Parallel implementation
│   ├── workers/
│   │   └── mergeSortWorker.ts      # Worker thread implementation
│   ├── index.ts                    # Main demo
│   └── benchmark.ts                # Performance benchmarks
├── tests/
│   └── SequentialMergeSort.test.ts # Unit tests
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd merge-sort-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## Usage

### Quick Demo
Run the main demonstration to see both algorithms in action:
```bash
npm run dev
```

### Performance Benchmarks
Run detailed performance comparisons:
```bash
npm run benchmark
```

### Unit Tests
Run the test suite:
```bash
npm test
```

### Watch Mode for Tests
```bash
npm run test:watch
```

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

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npx jest tests/SequentialMergeSort.test.ts
```

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

## Key Insights

### When Parallel Processing Helps
1. **Large datasets**: Arrays >10,000 elements
2. **CPU-bound tasks**: High computational complexity
3. **Multiple cores**: Systems with 4+ CPU cores
4. **Ideal conditions**: Well-balanced workload distribution

### When Sequential is Better
1. **Small datasets**: Overhead exceeds benefits
2. **Memory-bound tasks**: Limited by memory bandwidth
3. **Single core**: No parallel processing advantage
4. **I/O-bound tasks**: Limited by disk/network speed

## Limitations

- **Worker Thread Overhead**: Small tasks may be slower due to setup costs
- **Memory Usage**: Parallel implementations use more memory
- **Node.js Limitations**: Single-threaded event loop for I/O operations
- **Array Size Threshold**: Minimum size needed for parallel benefits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project is designed for educational purposes and demonstrates parallel programming concepts in Node.js. For production use, consider using specialized libraries and frameworks optimized for your specific use case. 
