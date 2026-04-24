# 🧬 Simple Microbiome Visualizer

Aplikasi analisis *Beta Diversity* interaktif yang dirancang untuk membantu peneliti mikrobioma mengeksplorasi hubungan antar sampel melalui teknik reduksi dimensi. Aplikasi ini mengintegrasikan kekuatan komputasi Python (Scikit-Learn) dengan responsivitas antarmuka React.

---

## 📂 Struktur Proyek

```text
simple-microbiome-visualizer/
├── backend/
│   ├── main.py            # API FastAPI & Logika Machine Learning
│   └── requirements.txt   # Dependensi Python
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── MicrobiomePlot.jsx  # Komponen Grafik Plotly
│   │   ├── App.jsx        # UI Utama & Logika Upload
│   │   ├── store.js       # State Management (Zustand)
│   │   └── index.css      # Konfigurasi Tailwind
│   ├── index.html         # Template HTML
│   ├── tailwind.config.js # Konfigurasi Tailwind
│   └── vite.config.js     # Konfigurasi Vite
└── README.md
```

---

## 🚀 Cara Menjalankan di Lokal

### 1. Persiapan Backend (FastAPI)

```bash
cd backend

# Membuat dan mengaktifkan Virtual Environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalasi dependensi
pip install fastapi uvicorn scikit-learn pandas scipy

# Jalankan server
uvicorn main:app --reload
```

Server akan berjalan di: http://127.0.0.1:8000

---

### 2. Persiapan Frontend (React + Vite)

```bash
cd frontend

# Gunakan Node.js v20 (disarankan via NVM)
nvm use 20

# Instalasi dependensi
npm install

# Jalankan aplikasi
npm run dev
```

Aplikasi akan berjalan di: http://localhost:5173

---

## 🛠️ Detail Implementasi

### Backend (Python/FastAPI)

Backend menangani pemrosesan data berat secara asinkron:

* **Data Cleaning**
  Memisahkan kolom metadata (non-numerik) dari matriks numerik OTU secara otomatis.

* **PCA**
  Menggunakan `sklearn.decomposition.PCA` untuk reduksi dimensi linier.

* **t-SNE**
  Menggunakan `sklearn.manifold.TSNE` untuk visualisasi klaster non-linier.

* **PCoA**
  Menggunakan jarak Bray-Curtis (`scipy.spatial.distance`) lalu dipetakan dengan `sklearn.manifold.MDS`.

---

### Frontend (React/Vite)

Frontend fokus pada pengalaman pengguna yang responsif dan interaktif:

* **Zustand**
  Digunakan sebagai state management agar hasil API tersimpan dan bisa digunakan ulang tanpa upload ulang.

* **Plotly**
  Digunakan untuk visualisasi interaktif berbasis scatter plot.

* **Tailwind CSS**
  Untuk membangun UI yang modern, bersih, dan cepat dikembangkan.

---

## 📊 Format Data Input (.csv)

Aplikasi menerima file CSV dengan ketentuan:

* Kolom awal berisi metadata (contoh: `id`, `country`, `target`)
* Kolom berikutnya berisi nilai numerik kelimpahan mikroba (Genus/OTU)
* Kolom `target` digunakan untuk pengelompokan warna (contoh: *Healthy* vs *Patient*)

---

## 📧 Kontak & Kontribusi

Proyek ini dikembangkan oleh **Dionisius Seraf Saputra** sebagai bagian dari pengembangan alat bantu analisis bioinformatika yang modern dan mudah diakses.

---

**Terakhir diperbarui:** 24 April 2026
