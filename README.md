# ⏱️ timerify

[![CI](https://github.com/lwensveen/timerify/actions/workflows/ci.yml/badge.svg)](https://github.com/lwensveen/timerify/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/timerify)](https://www.npmjs.com/package/timerify)
[![downloads](https://img.shields.io/npm/dw/timerify)](https://www.npmjs.com/package/timerify)
[![size](https://img.shields.io/bundlephobia/minzip/timerify)](https://bundlephobia.com/package/timerify)
[![codecov](https://codecov.io/gh/lwensveen/timerify/branch/main/graph/badge.svg)](https://codecov.io/gh/lwensveen/timerify)
[![docs](https://img.shields.io/badge/docs-%E2%9C%93-blue)](https://lwensveen.github.io/timerify/)
[![license](https://img.shields.io/npm/l/timerify)](LICENSE)

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