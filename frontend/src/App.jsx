import React from 'react';
import axios from 'axios';
import { useStore } from './store';
import MicrobiomePlot from './components/MicrobiomePlot';

function App() {
  const { isLoading, activeViz, colorBy, setLoading, setData, setActiveViz, setColorBy } = useStore();

  // Fungsi pengirim file ke Backend FastAPI
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/compute', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setData(response.data.data); // Simpan JSON ke memori Zustand
    } catch (error) {
      alert("Gagal memproses data. Pastikan Backend FastAPI sedang berjalan.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Microbiome Beta Diversity</h1>
          <p className="text-gray-500 mt-1">Platform Eksplorasi PCoA, PCA, dan t-SNE</p>
        </div>

        {/* Control Panel (Upload & Dropdowns) */}
        <div className="bg-white p-6 rounded-lg shadow border flex flex-wrap gap-6 items-end">
          
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">1. Unggah OTU Table (.csv)</label>
            <input 
              type="file" 
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">2. Metode Reduksi</label>
            <select 
              value={activeViz} 
              onChange={(e) => setActiveViz(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="pcoa">PCoA (Bray-Curtis)</option>
              <option value="pca">PCA</option>
              <option value="tsne">t-SNE</option>
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">3. Warna Berdasarkan</label>
            <select 
              value={colorBy} 
              onChange={(e) => setColorBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="target">Target (Kondisi)</option>
              <option value="country">Negara</option>
            </select>
          </div>

        </div>

        {/* Plot Area */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px] bg-white rounded-lg shadow border text-blue-600 font-semibold animate-pulse">
            Memproses matriks komputasi dari API...
          </div>
        ) : (
          <MicrobiomePlot />
        )}

      </div>
    </div>
  );
}

export default App;