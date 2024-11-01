import React, { useState } from 'react';
import ParticlesBg from './ParticlesBg';
import './DemoApp.css';

function DemoApp() {
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

  const handleChange = (name, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [name]: value };
      
      if (['isGradient', 'color1', 'color2'].includes(name)) {
        newSettings.backgroundColors = newSettings.isGradient
          ? `linear-gradient(135deg, ${newSettings.color1} 0%, ${newSettings.color2} 100%)`
          : newSettings.color1;
      }
      
      // Ensure minSpeed doesn't exceed maxSpeed
      if (name === 'minSpeed' && value > newSettings.maxSpeed) {
        newSettings.maxSpeed = value;
      }
      // Ensure maxSpeed doesn't fall below minSpeed
      if (name === 'maxSpeed' && value < newSettings.minSpeed) {
        newSettings.minSpeed = value;
      }
      
      return newSettings;
    });
  };

  return (
    <div className="App">
      <ParticlesBg {...settings} />
      <div className="settings-panel">
        <h1>ParticleBg Demo by Herbrax</h1>
        <h3 className="github-link">
          <a href="https://github.com/Herbrax/Particlebg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="github-icon"
            >
              <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.286-.011-1.243-.017-2.252-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.204.084 1.837 1.236 1.837 1.236 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.467-2.382 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.465 11.465 0 013.004-.404c1.02.004 2.047.137 3.003.404 2.292-1.553 3.3-1.23 3.3-1.23.653 1.652.241 2.872.118 3.176.77.839 1.235 1.911 1.235 3.221 0 4.61-2.805 5.623-5.476 5.921.43.37.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.797 24 17.303 24 12 24 5.373 18.627 0 12 0z" />
            </svg>
            GitHub Repository
          </a>
        </h3>
        {/* Background Settings */}
        <div className="settings-section">
          <h2 className="settings-subtitle">Background</h2>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.isGradient}
              onChange={(e) => handleChange('isGradient', e.target.checked)}
            />
            Use Gradient Background
          </label>
          
          <label>
          <div id="swatch">
                <input
                  type="color"
                  value={settings.color1}
                  onChange={(e) => handleChange('color1', e.target.value)}
                />
                <div className="info">
                  <h4>Background Color 1:</h4>
                </div>
              </div>
          </label>
          
          {settings.isGradient && (
            <label>
              <div id="swatch">
                <input
                  type="color"
                  value={settings.color2}
                  onChange={(e) => handleChange('color2', e.target.value)}
                />
                <div className="info">
                  <h4>Background Color 2:</h4>
                </div>
              </div>
            </label>
          )}
        </div>

        {/* Interactive Settings */}
        <div className="settings-section">
          <h2 className="settings-subtitle">Interaction</h2>
          
          <label>
            Create on Click: {settings.createOnClick} particles
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={settings.createOnClick}
              onChange={(e) => handleChange('createOnClick', parseInt(e.target.value))}
            />
          </label>

          <label>
            Repulse Range: {settings.repulse}px
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={settings.repulse}
              onChange={(e) => handleChange('repulse', parseInt(e.target.value))}
            />
          </label>
        </div>

        {/* Particle Settings */}
        <div className="settings-section">
          <h2 className="settings-subtitle">Particles</h2>
          
          <label>
            <div id="swatch">
              <input
                type="color"
                value={settings.dotColor}
                onChange={(e) => handleChange('dotColor', e.target.value)}
              />
              <div className="info">
                <h4>Dot Color:</h4>
              </div>
            </div>
          </label>

          <label>
            <div id="swatch">
              <input
                type="color"
                value={settings.lineColor}
                onChange={(e) => handleChange('lineColor', e.target.value)}
              />
              <div className="info">
                  <h4>Line Color:</h4>
              </div>
            </div>
          </label>
          

          <label>
            Particle Radius: {settings.particleRadius}px
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={settings.particleRadius}
              onChange={(e) => handleChange('particleRadius', parseFloat(e.target.value))}
            />
          </label>

          <label>
            Line Width: {settings.lineWidth}px
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={settings.lineWidth}
              onChange={(e) => handleChange('lineWidth', parseFloat(e.target.value))}
            />
          </label>

          <label>
            Proximity: {settings.proximity}px
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={settings.proximity}
              onChange={(e) => handleChange('proximity', parseFloat(e.target.value))}
            />
          </label>

          <label>
            Min Speed: {settings.minSpeed}
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.minSpeed}
              onChange={(e) => handleChange('minSpeed', parseFloat(e.target.value))}
            />
          </label>

          <label>
            Max Speed: {settings.maxSpeed}
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.maxSpeed}
              onChange={(e) => handleChange('maxSpeed', parseFloat(e.target.value))}
            />
          </label>

          <label>
            Density: {settings.density} particles
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={settings.density}
              onChange={(e) => handleChange('density', parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default DemoApp;