import React from 'react';
import Plot from 'react-plotly.js';
import { useStore } from '../store';

const MicrobiomePlot = () => {
  const { microbiomeData, activeViz, colorBy } = useStore();

  // Tampilan awal jika belum ada file yang diunggah
  if (!microbiomeData) {
    return (
      <div className="flex items-center justify-center h-[500px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50">
        Silakan unggah tabel OTU (.csv) untuk memulai analisis.
      </div>
    );
  }

  // Fungsi mengubah data JSON menjadi format grup yang dibaca oleh Plotly
  const preparePlotData = () => {
    const groups = {};

    microbiomeData.forEach(item => {
      const groupKey = item[colorBy] || 'Unknown';
      
      if (!groups[groupKey]) {
        groups[groupKey] = {
          x: [], y: [], text: [],
          mode: 'markers', type: 'scatter', name: groupKey,
          marker: { size: 10, opacity: 0.8 }
        };
      }

      groups[groupKey].x.push(item[activeViz].x);
      groups[groupKey].y.push(item[activeViz].y);
      groups[groupKey].text.push(`ID: ${item.id}<br>Country: ${item.country}<br>Target: ${item.target}`);
    });

    return Object.values(groups);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <Plot
        data={preparePlotData()}
        layout={{
          title: `Visualisasi ${activeViz.toUpperCase()} (Berdasarkan ${colorBy})`,
          autosize: true,
          hovermode: 'closest',
          margin: { l: 50, r: 50, b: 50, t: 50 }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
};

export default MicrobiomePlot;