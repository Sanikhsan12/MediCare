export const topics = [
  {
    id: "diabetes",
    label: "Diabetes Prediction",
    description: "Memprediksi kemungkinan penyakit diabetes berdasarkan pengukuran diagnostik medis.",
    fields: [
      { name: "pregnancies", label: "Pregnancies", description: "Berapa kali mengalami kehamilan", type: "number", min: 0, max: 20 },
      { name: "glucose", label: "Glucose", description: "Konsentrasi glukosa plasma (mg/dL)", type: "number", min: 0, max: 300 },
      { name: "blood_pressure", label: "Blood Pressure", description: "Tekanan darah diastolik (mm Hg)", type: "number", min: 0, max: 200 },
      { name: "skin_thickness", label: "Skin Thickness", description: "Ketebalan lipatan kulit triceps (mm)", type: "number", min: 0, max: 100 },
      { name: "insulin", label: "Insulin", description: "Insulin serum 2 jam (mu U/ml)", type: "number", min: 0, max: 900 },
      { name: "bmi", label: "BMI", description: "Indeks Massa Tubuh (kg/m^2)", type: "number", min: 0, max: 70, step: 0.1 },
      { name: "diabetes_pedigree", label: "Diabetes Pedigree", description: "Skor riwayat diabetes dalam keluarga", type: "number", min: 0, max: 2.5, step: 0.001 },
      { name: "age", label: "Age", description: "Usia pasien (Tahun)", type: "number", min: 1, max: 120 }
    ]
  },
  {
    id: "heart_disease",
    label: "Heart Disease Prediction",
    description: "Mendeteksi kemungkinan penyakit jantung dari data klinis dan tes laboratorium pasien.",
    fields: [
      { name: "age", label: "Age", description: "Usia pasien (Tahun)", type: "number", min: 1, max: 120 },
      { name: "sex", label: "Sex", description: "Jenis kelamin pasien", type: "select", options: [{value: "1", label: "Male"}, {value: "0", label: "Female"}] },
      { name: "cp", label: "Chest Pain Type", description: "Tipe nyeri dada yang dirasakan", type: "select", options: [
        {value: "0", label: "Typical Angina (Angina biasa)"}, {value: "1", label: "Atypical Angina (Angina tidak biasa)"},
        {value: "2", label: "Non-anginal (Bukan angina)"}, {value: "3", label: "Asymptomatic (Tanpa gejala)"}
      ]},
      { name: "trestbps", label: "Resting Blood Pressure", description: "Tekanan darah saat istirahat (mm Hg)", type: "number", min: 80, max: 250 },
      { name: "chol", label: "Serum Cholesterol", description: "Kadar kolesterol serum (mg/dl)", type: "number", min: 100, max: 600 },
      { name: "fbs", label: "Fasting Blood Sugar > 120", description: "Apakah gula darah puasa di atas 120 mg/dl?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "restecg", label: "Resting ECG", description: "Hasil elektrokardiogram saat istirahat", type: "select", options: [
        {value: "0", label: "Normal"}, {value: "1", label: "ST-T Abnormality (Kelainan ST-T)"}, {value: "2", label: "LV Hypertrophy (Hipertrofi)"}
      ]},
      { name: "thalach", label: "Max Heart Rate", description: "Detak jantung maksimum yang dicapai", type: "number", min: 50, max: 250 },
      { name: "exang", label: "Exercise Induced Angina", description: "Apakah olahraga menyebabkan nyeri dada (angina)?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "oldpeak", label: "ST Depression", description: "Depresi ST akibat olahraga relatif terhadap istirahat", type: "number", min: 0, max: 10, step: 0.1 },
      { name: "slope", label: "ST Slope", description: "Kemiringan segmen ST saat latihan puncak", type: "select", options: [
        {value: "0", label: "Upsloping (Naik)"}, {value: "1", label: "Flat (Datar)"}, {value: "2", label: "Downsloping (Turun)"}
      ]},
      { name: "ca", label: "Major Vessels", description: "Jumlah pembuluh darah utama (0-3)", type: "select", options: [
        {value: "0", label: "0"}, {value: "1", label: "1"}, {value: "2", label: "2"}, {value: "3", label: "3"}
      ]},
      { name: "thal", label: "Thal", description: "Status kelainan darah Thalassemia", type: "select", options: [
        {value: "0", label: "Normal"}, {value: "1", label: "Fixed Defect (Cacat tetap)"}, {value: "2", label: "Reversible Defect (Cacat reversibel)"}
      ]}
    ]
  },
  {
    id: "breast_cancer",
    label: "Breast Cancer Detection",
    description: "Mendeteksi apakah kanker payudara bersifat ganas (malignant) atau jinak (benign) berdasarkan ciri inti sel.",
    fields: [
      { name: "radius_mean", label: "Radius Mean", description: "Rata-rata jarak dari pusat ke perimeter inti sel", type: "number", min: 0, max: 30, step: 0.01 },
      { name: "texture_mean", label: "Texture Mean", description: "Variasi standar deviasi dari nilai skala abu-abu", type: "number", min: 0, max: 40, step: 0.01 },
      { name: "perimeter_mean", label: "Perimeter Mean", description: "Rata-rata ukuran perimeter/keliling inti sel", type: "number", min: 0, max: 250, step: 0.01 },
      { name: "area_mean", label: "Area Mean", description: "Rata-rata ukuran area/luas inti sel", type: "number", min: 0, max: 2600, step: 0.1 },
      { name: "smoothness_mean", label: "Smoothness Mean", description: "Rata-rata variasi lokal dalam panjang radius", type: "number", min: 0, max: 0.2, step: 0.0001 },
      { name: "compactness_mean", label: "Compactness Mean", description: "Rata-rata (perimeter^2 / area - 1.0)", type: "number", min: 0, max: 0.5, step: 0.0001 },
      { name: "concavity_mean", label: "Concavity Mean", description: "Rata-rata tingkat keparahan lekukan kontur", type: "number", min: 0, max: 0.5, step: 0.0001 },
      { name: "concave_points_mean", label: "Concave Points Mean", description: "Rata-rata jumlah titik lekukan pada kontur", type: "number", min: 0, max: 0.2, step: 0.0001 },
      { name: "symmetry_mean", label: "Symmetry Mean", description: "Rata-rata simetri dari inti sel", type: "number", min: 0, max: 0.4, step: 0.0001 },
      { name: "fractal_dimension_mean", label: "Fractal Dimension Mean", description: "Rata-rata pendekatan fraktal garis batas", type: "number", min: 0, max: 0.1, step: 0.0001 }
    ]
  },
  {
    id: "obesity",
    label: "Obesity Level Prediction",
    description: "Memperkirakan tingkat obesitas berdasarkan kebiasaan makan dan kondisi fisik.",
    fields: [
      { name: "gender", label: "Gender", description: "Jenis kelamin", type: "select", options: [{value: "1", label: "Male"}, {value: "0", label: "Female"}] },
      { name: "age", label: "Age", description: "Usia (Tahun)", type: "number", min: 1, max: 100 },
      { name: "height", label: "Height", description: "Tinggi badan (Meter)", type: "number", min: 1.0, max: 2.5, step: 0.01 },
      { name: "weight", label: "Weight", description: "Berat badan (Kilogram)", type: "number", min: 20, max: 200, step: 0.1 },
      { name: "family_history", label: "Family History of Overweight", description: "Apakah ada anggota keluarga yang obesitas?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "favc", label: "Frequent High Calorie Food", description: "Sering mengonsumsi makanan berkalori tinggi?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "fcvc", label: "Frequency of Vegetable Consumption", description: "Seberapa sering makan sayur? (1: Jarang, 3: Selalu)", type: "select", options: [{value: "1", label: "1 - Jarang"}, {value: "2", label: "2 - Kadang"}, {value: "3", label: "3 - Selalu"}] },
      { name: "ncp", label: "Number of Main Meals", description: "Berapa kali makan besar dalam sehari?", type: "select", options: [{value: "1", label: "1"}, {value: "2", label: "2"}, {value: "3", label: "3"}, {value: "4", label: "4"}] },
      { name: "caec", label: "Eating Between Meals", description: "Seberapa sering makan camilan di antara waktu makan?", type: "select", options: [
        {value: "0", label: "No (Tidak pernah)"}, {value: "1", label: "Sometimes (Kadang)"}, 
        {value: "2", label: "Frequently (Sering)"}, {value: "3", label: "Always (Selalu)"}
      ]},
      { name: "smoke", label: "Smoke", description: "Apakah Anda merokok?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "ch2o", label: "Daily Water Intake", description: "Berapa liter air minum sehari?", type: "select", options: [{value: "1", label: "1 Liter"}, {value: "2", label: "2 Liter"}, {value: "3", label: "3 Liter"}] },
      { name: "scc", label: "Calorie Monitoring", description: "Apakah Anda memantau kalori yang dimakan?", type: "select", options: [{value: "1", label: "Yes (Ya)"}, {value: "0", label: "No (Tidak)"}] },
      { name: "faf", label: "Physical Activity Frequency", description: "Seberapa sering berolahraga? (0: Tidak pernah, 3: Sering)", type: "select", options: [{value: "0", label: "0 - Tidak pernah"}, {value: "1", label: "1 - Jarang"}, {value: "2", label: "2 - Kadang"}, {value: "3", label: "3 - Sering"}] },
      { name: "tue", label: "Time Using Technology", description: "Berapa jam sehari menggunakan gadget/teknologi?", type: "select", options: [{value: "0", label: "0 Jam"}, {value: "1", label: "1 Jam"}, {value: "2", label: "2 Jam"}] },
      { name: "calc", label: "Alcohol Consumption", description: "Seberapa sering minum alkohol?", type: "select", options: [
        {value: "0", label: "No (Tidak pernah)"}, {value: "1", label: "Sometimes (Kadang)"}, 
        {value: "2", label: "Frequently (Sering)"}, {value: "3", label: "Always (Selalu)"}
      ]},
      { name: "mtrans", label: "Transportation", description: "Transportasi apa yang biasa digunakan?", type: "select", options: [
        {value: "0", label: "Mobil (Pribadi)"}, {value: "2", label: "Motor (Pribadi)"}, 
        {value: "1", label: "Sepeda"}, {value: "3", label: "Transportasi Publik"}, 
        {value: "4", label: "Jalan Kaki"}
      ]}
    ]
  },
  {
    id: "banknote",
    label: "Banknote Authentication",
    description: "Mendeteksi keaslian uang kertas dari fitur transformasi gambar wavelet.",
    fields: [
      { name: "variance", label: "Variance of Wavelet", description: "Variansi dari gambar yang ditransformasi", type: "number", min: -10, max: 10, step: 0.0001 },
      { name: "skewness", label: "Skewness of Wavelet", description: "Skewness dari gambar yang ditransformasi", type: "number", min: -15, max: 15, step: 0.0001 },
      { name: "curtosis", label: "Curtosis of Wavelet", description: "Kurtosis dari gambar yang ditransformasi", type: "number", min: -10, max: 20, step: 0.0001 },
      { name: "entropy", label: "Entropy of Image", description: "Entropi (keacakan) dari gambar", type: "number", min: -10, max: 5, step: 0.0001 }
    ]
  }
];
