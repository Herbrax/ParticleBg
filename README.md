# ParticlesBg

**Author:** Simo Hakim (me@simohakim.com)

---

## Overview

**ParticlesBg** is a React component that generates an animated particle background using HTML5 Canvas. This component creates particles that move dynamically, bounce off the canvas edges, and connect via lines when within a specified proximity, adding a visually engaging effect to your web app.

---

## Component Props

Customize your particle background using the following props:

- **`backgroundColors`** (string): Set the canvas background color or gradient.
- **`density`** (number): Control the particle count; higher values create more particles.
- **`dotColor`** (string): Set the color of each particle dot.
- **`lineColor`** (string): Specify the color of connecting lines between particles.
- **`particleRadius`** (number): Define the radius of each particle dot.
- **`lineWidth`** (number): Set the thickness of lines connecting particles.
- **`proximity`** (number): Maximum distance between particles for line connections.
- **`maxSpeedX`** (number): Maximum horizontal speed for particles.
- **`maxSpeedY`** (number): Maximum vertical speed for particles.

---

## Usage

To use this component, simply import and render `<ParticlesBg />` in your React app:

```jsx
import ParticlesBg from './ParticlesBg';

function App() {
  return <ParticlesBg />;
}
```

Adjust the props as needed to fine-tune the appearance and movement of particles.

---

## Inspiration

This component is inspired by the "Particleground" library by Jonathan Nicol, with added customization and React-friendly features for ease of integration.

---

## License

MIT License

Copyright (c) [2024] [Simo Hakim]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
