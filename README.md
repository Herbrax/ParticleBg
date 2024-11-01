# ParticlesBg

**Author:** Simo Hakim (Herbrax)

---

## Overview

**ParticlesBg** is a React component that generates an interactive animated particle background using HTML5 Canvas. This component creates particles that move dynamically, bounce off the canvas edges, and connect via lines when within a specified proximity, adding a visually engaging effect to your web app.

**[Demo Available Here](https://herbrax.github.io/ParticlesBg/)**

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
- **`minSpeed`** (number): Minimum speed for particle movement.
- **`maxSpeed`** (number): Maximum speed for particle movement.
- **`createOnClick`** (number): Number of particles to create when the canvas is clicked.
- **`repulse`** (number): Distance from the mouse cursor within which particles will be repelled.

---

## Usage

To use this component, simply import and render `<ParticlesBg />` in your React app:

```jsx
import ParticlesBg from './ParticlesBg';

function App() {
  return <ParticlesBg />;
}
```

And if you're using it with custom props : 


```jsx
  const [settings, setSettings] = useState({
    backgroundColors: 'linear-gradient(135deg, #3990e6 0%, #149f7c 100%)',
    density: 150,
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',
    particleRadius: 3,
    lineWidth: 0.7,
    proximity: 150,
    minSpeed: 0.6,
    maxSpeed: 2,
    isGradient: true,
    color1: '#3990e6',
    color2: '#149f7c',
    createOnClick: 5,
    repulse: 100,
  });

  return <ParticlesBg {...settings} />
```

Adjust the props as needed to fine-tune the appearance and movement of particles.

---

## Inspiration

This component is inspired by the "Particleground" library by Jonathan Nicol, with added customization and React-friendly features for ease of integration.

---

## License

MIT License

Copyright (c) [2024] [Simo Hakim (Herbrax)]

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
