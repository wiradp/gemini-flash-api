# Gemini Flash - Multimodal API Server

HEAD
Proyek ini adalah sebuah API server yang dibangun dengan Node.js dan Express.js untuk memanfaatkan kemampuan multimodal dari model **Google Gemini Flash**. Server ini menyediakan beberapa endpoint untuk memproses berbagai jenis input seperti teks, gambar, dokumen, dan audio.

## Deskripsi

Server ini berfungsi sebagai backend yang kuat dan mudah digunakan untuk berinteraksi dengan Google Gemini AI. Dengan menggunakan `multer` untuk menangani unggahan file, server ini dapat menerima berbagai jenis media dan meneruskannya ke model AI untuk diproses. Ini adalah fondasi yang sangat baik untuk membangun aplikasi yang lebih kompleks yang memerlukan kemampuan AI generatif multimodal.

## Fitur Utama

- **Generasi Teks:** Menghasilkan konten teks berdasarkan prompt.
- **Analisis Gambar:** Menerima unggahan gambar dan menghasilkan deskripsi atau analisis teks.
- **Analisis Dokumen:** Menganalisis konten dari berbagai jenis dokumen yang diunggah.
- **Transkripsi Audio:** Mengubah file audio yang diunggah menjadi teks.
- **Penanganan File:** Menggunakan `multer` untuk manajemen unggahan file yang efisien.
- **Konfigurasi Mudah:** Menggunakan file `.env` untuk menyimpan kunci API dengan aman.

## Teknologi yang Digunakan

- **Backend:**
  - Node.js
  - Express.js
  - Google Generative AI SDK
  - Multer untuk menangani `multipart/form-data`.
  - `dotenv` untuk manajemen environment variable.

## Prasyarat

- Node.js (versi 18.0.0 atau lebih baru).
- Sebuah **API Key** dari Google AI Studio.

## Instalasi dan Konfigurasi

1.  **Clone repository ini:**

    ```bash
    git clone https://github.com/username/repository-name.git
    ```

    _(Ganti `username/repository-name` dengan URL repository Anda)_

2.  **Masuk ke direktori proyek:**

    ```bash
    cd gemini-flash-api
    ```

3.  **Install semua dependency:**

    ```bash
    npm install
    ```

4.  **Buat file `.env` di root direktori:**

    ```bash
    touch .env
    ```

5.  **Tambahkan API Key Anda ke dalam file `.env`:**
    ```
    GEMINI_API_KEY=API_KEY_ANDA
    ```

## Menjalankan Server

Untuk memulai server, jalankan perintah berikut:

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`.

## Dokumentasi API

Berikut adalah detail dari setiap endpoint yang tersedia.

---

### 1. Generate Text

- **URL:** `/generate-text`
- **Method:** `POST`
- **Body (raw, JSON):** `{"prompt": "Tulis sebuah puisi tentang hujan."}`
- **Contoh `curl`:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Tulis sebuah puisi tentang hujan."}' http://localhost:3000/generate-text
  ```

---

### 2. Generate from Image

- **URL:** `/generate-from-image`
- **Method:** `POST`
- **Body (`form-data`):** `image` (file), `prompt` (teks, opsional)
- **Contoh `curl`:**
  ```bash
  curl -X POST -F "image=@/path/to/your/image.png" -F "prompt=Describe the image" http://localhost:3000/generate-from-image
  ```

---

### 3. Generate from Document

- **URL:** `/generate-from-document`
- **Method:** `POST`
- **Body (`form-data`):** `document` (file)
- **Contoh `curl`:**
  ```bash
  curl -X POST -F "document=@/path/to/your/document.pdf" http://localhost:3000/generate-from-document
  ```

---

### 4. Generate from Audio

- **URL:** `/generate-from-audio`
- **Method:** `POST`
- **Body (`form-data`):** `audio` (file)
- **Contoh `curl`:**
  ```bash
  curl -X POST -F "audio=@/path/to/your/audio.mp3" http://localhost:3000/generate-from-audio
  ```

## Struktur Proyek

```
/
├── uploads/            # Direktori sementara untuk file yang diunggah
├── .env                # File untuk menyimpan variabel lingkungan (API Key)
├── index.js            # File utama server (logika Express & Gemini)
├── package.json        # Metadata proyek dan daftar dependency
└── README.md           # Dokumentasi proyek (file ini)
```

## Lisensi

Proyek ini dilisensikan di bawah Lisensi ISC.

Yuk mampir ke portofolio saya (https://wiradp.github.io/)
