import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

const MicrobiomePlot = () => {
  const { microbiomeData, activeViz, colorBy } = useStore();
  const plotRef = useRef(null);

  useEffect(() => {
    if (!microbiomeData || !plotRef.current) return;

    // Persiapkan data untuk Plotly
    const groups = {};
    microbiomeData.forEach(item => {
      const groupKey = item[colorBy] || 'Unknown';
      if (!groups[groupKey]) {
        groups[groupKey] = {
          x: [], y: [], text: [],
          mode: 'markers', type: 'scatter', name: groupKey,
          marker: { size: 10, opacity: 0.7 }
        };
      }
      const coords = item[activeViz];
      if (coords) {
        groups[groupKey].x.push(coords.x);
        groups[groupKey].y.push(coords.y);
        groups[groupKey].text.push(`ID: ${item.id}<br>Target: ${item.target}`);
      }
    });

    const data = Object.values(groups);
    const layout = {
      title: `Visualisasi ${activeViz.toUpperCase()}`,
      autosize: true,
      hovermode: 'closest',
      margin: { l: 60, r: 40, b: 60, t: 80 }
    };

    // Panggil Plotly dari window (Global)
    window.Plotly.newPlot(plotRef.current, data, layout, { responsive: true });

    // Cleanup saat viz berubah atau unmount
    return () => {
      if (plotRef.current) window.Plotly.purge(plotRef.current);
    };
  }, [microbiomeData, activeViz, colorBy]);

  if (!microbiomeData) {
    return (
      <div className="flex items-center justify-center h-[500px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50">
        Silakan unggah tabel OTU (.csv) untuk memulai analisis.
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <div ref={plotRef} className="w-full h-[600px]"></div>
    </div>
  );
};

export default MicrobiomePlot;