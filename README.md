# ⏱️ timerify

[![codecov](https://codecov.io/gh/lwensveen/timerify/branch/main/graph/badge.svg)](https://codecov.io/gh/lwensveen/timerify)

A simple, zero-config wrapper for measuring the runtime of synchronous and asynchronous functions.

## Installation

Install `timerify` via npm:

```bash
npm install timerify
```

## Usage

### JavaScript/TypeScript

Wrap a function to measure its runtime:

```ts
import { timerify } from 'timerify';

const slow = timerify(async () => await fetch(url), 'fetch');
await slow();
```

### CLI

Measure the runtime of a function via the command line:

```bash
npx timerify src/job.ts runJob
```

## Features

- **Zero-Config**: No setup required; just wrap your function and measure.
- **Sync/Async Support**: Works with both synchronous and asynchronous functions.
- **CLI Integration**: Run measurements directly from the command line.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/lwensveen/timerify).

## Support

If you encounter issues or have questions, file an issue on the [GitHub repository](https://github.com/lwensveen/timerify/issues).