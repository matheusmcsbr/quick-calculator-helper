
import React, { useEffect, useRef } from 'react';
import CalculatorIcon from '@/components/CalculatorIcon';

const IconPage = () => {
  const canvas16Ref = useRef<HTMLCanvasElement>(null);
  const canvas48Ref = useRef<HTMLCanvasElement>(null);
  const canvas128Ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const renderIcon = (canvas: HTMLCanvasElement | null, size: number) => {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a temporary SVG element
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('width', size.toString());
      svgElement.setAttribute('height', size.toString());
      svgElement.setAttribute('viewBox', `0 0 ${size} ${size}`);
      
      // Background rectangle with rounded corners
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const cornerRadius = size * 0.2;
      rectElement.setAttribute('x', '0');
      rectElement.setAttribute('y', '0');
      rectElement.setAttribute('width', size.toString());
      rectElement.setAttribute('height', size.toString());
      rectElement.setAttribute('rx', cornerRadius.toString());
      rectElement.setAttribute('fill', '#1C1C1E');
      svgElement.appendChild(rectElement);
      
      // Display area
      const displayWidth = size * 0.6;
      const displayHeight = size * 0.15;
      const displayX = (size - displayWidth) / 2;
      const displayY = size * 0.2;
      const displayRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      displayRect.setAttribute('x', displayX.toString());
      displayRect.setAttribute('y', displayY.toString());
      displayRect.setAttribute('width', displayWidth.toString());
      displayRect.setAttribute('height', displayHeight.toString());
      displayRect.setAttribute('rx', (size * 0.04).toString());
      displayRect.setAttribute('fill', '#F5F5F7');
      svgElement.appendChild(displayRect);
      
      // Draw calculator buttons
      const buttonSize = size * 0.15;
      const startY = size * 0.4;
      const gap = size * 0.07;
      
      // Function to create circle buttons
      const createCircle = (cx: number, cy: number, r: number, fill: string) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx.toString());
        circle.setAttribute('cy', cy.toString());
        circle.setAttribute('r', r.toString());
        circle.setAttribute('fill', fill);
        return circle;
      };
      
      // Row 1
      for (let i = 0; i < 3; i++) {
        const x = size * 0.25 + i * (buttonSize + gap);
        svgElement.appendChild(createCircle(x, startY, buttonSize / 2, '#E5E5EA'));
      }
      svgElement.appendChild(createCircle(size * 0.75, startY, buttonSize / 2, '#FF9F0A'));
      
      // Row 2
      for (let i = 0; i < 3; i++) {
        const x = size * 0.25 + i * (buttonSize + gap);
        svgElement.appendChild(createCircle(x, startY + buttonSize + gap, buttonSize / 2, '#E5E5EA'));
      }
      svgElement.appendChild(createCircle(size * 0.75, startY + buttonSize + gap, buttonSize / 2, '#FF9F0A'));
      
      // Row 3
      for (let i = 0; i < 3; i++) {
        const x = size * 0.25 + i * (buttonSize + gap);
        svgElement.appendChild(createCircle(x, startY + 2 * (buttonSize + gap), buttonSize / 2, '#E5E5EA'));
      }
      svgElement.appendChild(createCircle(size * 0.75, startY + 2 * (buttonSize + gap), buttonSize / 2, '#30D158'));
      
      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Draw SVG on canvas
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };
    
    renderIcon(canvas16Ref.current, 16);
    renderIcon(canvas48Ref.current, 48);
    renderIcon(canvas128Ref.current, 128);
  }, []);
  
  const downloadCanvas = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };
  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-medium">Calculator Icons</h1>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">16x16</h2>
          <canvas ref={canvas16Ref} width={16} height={16} className="border border-gray-300 w-16 h-16"></canvas>
          <button 
            onClick={() => downloadCanvas(canvas16Ref.current, 'calculator-16.png')}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Download 16x16
          </button>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">48x48</h2>
          <canvas ref={canvas48Ref} width={48} height={48} className="border border-gray-300 w-24 h-24"></canvas>
          <button 
            onClick={() => downloadCanvas(canvas48Ref.current, 'calculator-48.png')}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Download 48x48
          </button>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">128x128</h2>
          <canvas ref={canvas128Ref} width={128} height={128} className="border border-gray-300 w-32 h-32"></canvas>
          <button 
            onClick={() => downloadCanvas(canvas128Ref.current, 'calculator-128.png')}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Download 128x128
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">SVG Icon Component</h2>
        <div className="p-8 bg-gray-100 rounded-lg flex justify-center">
          <CalculatorIcon size={128} />
        </div>
      </div>
    </div>
  );
};

export default IconPage;
