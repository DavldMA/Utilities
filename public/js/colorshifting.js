// Function to perform a hue shift on a given color
function hueShift(color, amount) {
    // Convert the color to HSL
    const hsl = rgbToHsl(color.r, color.g, color.b);
  
    // Apply the hue shift
    const shiftedHsl = {
      h: (hsl.h + amount) % 360,
      s: hsl.s,
      l: hsl.l
    };
  
    // Convert the shifted HSL color back to RGB
    const rgb = hslToRgb(shiftedHsl.h, shiftedHsl.s, shiftedHsl.l);
  
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  
  // Function to convert RGB color to HSL
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  
  // Function to convert HSL color to RGB
  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
  
  // Function to convert RGB color to hexadecimal
  function rgbToHex(r, g, b) {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }
  
  // Initial color values
  const color = { r: 100, g: 150, b: 200 };
  
  console.log('Original color:', rgbToHex(color.r, color.g, color.b));
  
  // Perform three hue shifts for brighter variations
  for (let i = 1; i <= 3; i++) {
    const shiftedColor = hueShift(color, i * 30);
    console.log('Brighter variation', i, ':', shiftedColor);
  }
  
  // Perform three hue shifts for darker variations
  for (let i = 1; i <= 3; i++) {
    const shiftedColor = hueShift(color, -i * 30);
    console.log('Darker variation', i, ':', shiftedColor);
  }
  