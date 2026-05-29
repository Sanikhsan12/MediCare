# MediCare Application

MediCare adalah aplikasi berbasis web yang memanfaatkan Machine Learning untuk memprediksi berbagai kondisi kesehatan, seperti Diabetes, Penyakit Jantung (Heart Disease), Kanker Payudara (Breast Cancer), Obesitas, dan juga memiliki satu kemampuan ekstra untuk mendeteksi keaslian uang kertas (Banknote). 

Aplikasi ini dirancang menggunakan arsitektur **Microservices (3-Container)** tanpa menggunakan database (stateless/one-shot session).

## 📂 Struktur Direktori

Aplikasi dibagi menjadi tiga modul (service) utama:

- **`fe-service/` (Frontend)**
  - Dibangun menggunakan **React** dan **Vite** dengan styling **Tailwind CSS**.
  - Bertugas menampilkan antarmuka web, form input dinamis berdasarkan topik klasifikasi, serta fitur *Dark/Light Mode*.
- **`be-service/` (Backend Gateway)**
  - Dibangun menggunakan **Golang** (chi router).
  - Bertugas sebagai API Gateway yang menjembatani Frontend dan ML Service. Melakukan validasi input agar sesuai dengan kriteria yang dibutuhkan oleh model ML terkait.
- **`ml-service/` (Machine Learning Service)**
  - Dibangun menggunakan **Python** dan **FastAPI**.
  - Bertugas meload file model ML (`.pkl`, `.joblib`, dll) beserta scaler-nya dari dalam direktori `models/` secara dinamis, dan memberikan hasil prediksi beserta persentase *confidence/probability*.

## ⚙️ Cara Kerja Aplikasi

1. **User Input**: Pengguna mengakses halaman web (Frontend) dan memilih jenis prediksi yang ingin diuji (Misal: Breast Cancer). Form yang sesuai akan otomatis muncul.
2. **Validasi (Gateway)**: Data dari form dikirim melalui HTTP POST ke Backend Gateway (Go). Go akan memvalidasi kelengkapan data.
3. **Inferensi Model**: Jika valid, data dilempar ke ML Service (Python). 
4. **Preprocessing**: Apabila terdapat *Scaler* pada folder model, fitur akan di-scale terlebih dahulu.
5. **Prediksi**: Model kemudian melakukan `predict` (dan `predict_proba`).
6. **Response**: Hasil prediksi dikembalikan secara berantai (ML -> BE -> FE) lalu ditampilkan di layar pengguna dalam bentuk *Result Card*.

## 🚀 Cara Menambahkan Model Anda Sendiri

Bawaan aplikasi tidak menyertakan file model berukuran besar. Anda dapat menambahkan file hasil *dump* model Anda secara manual.
1. Masukkan file model (`model.pkl` / `model.joblib`) ke dalam folder topik yang sesuai di direktori `ml-service/models/`. Contoh:
   - `ml-service/models/diabetes/model.joblib`
   - `ml-service/models/breast_cancer/model.pkl`
2. Jika Anda menggunakan **Scaler** tersendiri (misal: StandardScaler), masukkan juga berdampingan dengan nama awalan `scaler`:
   - `ml-service/models/breast_cancer/scaler.pkl`
3. Restart container ML jika sedang berjalan.

*(Apabila folder model dibiarkan kosong, sistem akan menggunakan "dummy logic" agar aplikasi tetap bisa didemokan).*

## 🐳 Cara Deploy Menggunakan Docker (Lokal)

Aplikasi ini telah sepenuhnya di-dockerize dengan menggunakan `docker-compose`. Pastikan Anda telah menginstal **Docker** dan **Docker Compose** di perangkat lokal Anda.

### 1. Build dan Jalankan Container
Buka terminal/CMD di *root directory* tempat file `docker-compose.yml` berada, lalu jalankan:

```bash
docker-compose up --build -d
```
*Parameter `-d` (detached) digunakan agar container berjalan di background.*

### 2. Akses Aplikasi
Setelah proses build selesai, buka web browser Anda di:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API Status**: [http://localhost:8080/health](http://localhost:8080/health)
- **ML API Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Menghentikan Aplikasi
Untuk mematikan container, gunakan perintah:
```bash
docker-compose down
```
