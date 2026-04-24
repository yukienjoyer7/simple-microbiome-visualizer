from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import numpy as np

from sklearn.decomposition import PCA
from sklearn.manifold import TSNE, MDS
from scipy.spatial.distance import pdist, squareform

app = FastAPI(title="Simple Microbiome Visualizer API")

# Konfigurasi CORS agar frontend (React/Vite) bisa berkomunikasi dengan API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/compute")
async def compute_visualizations(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File harus berupa CSV")

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
            
        metadata_cols = ['SSR_id', 'country', 'Projek_ID', 'Target']
        valid_metadata_cols = [col for col in metadata_cols if col in df.columns]
        metadata = df[valid_metadata_cols]
        otu_matrix = df.drop(columns=valid_metadata_cols)

        pca = PCA(n_components=2)
        pca_coords = pca.fit_transform(otu_matrix)

        tsne = TSNE(n_components=2, perplexity=30, random_state=42)
        tsne_coords = tsne.fit_transform(otu_matrix)

        dist_matrix = squareform(pdist(otu_matrix, metric='braycurtis'))
        mds = MDS(n_components=2, dissimilarity='precomputed', random_state=42)
        pcoa_coords = mds.fit_transform(dist_matrix)

        results = []
        for i in range(len(df)):
            results.append({
                "id": str(metadata['SSR_id'].iloc[i]),
                "country": str(metadata['country'].iloc[i]),
                "target": str(metadata['Target'].iloc[i]),
                "pca": {"x": float(pca_coords[i, 0]), "y": float(pca_coords[i, 1])},
                "tsne": {"x": float(tsne_coords[i, 0]), "y": float(tsne_coords[i, 1])},
                "pcoa": {"x": float(pcoa_coords[i, 0]), "y": float(pcoa_coords[i, 1])}
            })

        return {"status": "success", "data": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses data: {str(e)}")