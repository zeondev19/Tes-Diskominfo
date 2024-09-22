# API E-commerce

## Deskripsi

Proyek ini adalah implementasi API RESTful untuk sistem e-commerce sederhana menggunakan Node.js, Express, dan MySQL. API ini menyediakan endpoint untuk manajemen produk dan pesanan.

## Fitur

- CRUD operasi untuk produk
- Pembuatan dan manajemen pesanan
- Integrasi dengan database MySQL
- Containerization menggunakan Docker

## Prasyarat

- Node.js (v14 atau lebih baru)
- Docker dan Docker Compose
- Postman (untuk testing API)

## Struktur Proyek

```
project-root/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── productModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── app.js
│
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── init.sql
├── package.json
└── README.md
```

## Instalasi dan Menjalankan Aplikasi

### Menggunakan Docker

1. Clone repositori ini
2. Navigasi ke direktori proyek
3. Jalankan perintah:
   ```
   docker-compose up --build
   ```
4. API akan tersedia di `http://localhost:3000`

### Tanpa Docker (Development)

1. Clone repositori ini
2. Navigasi ke direktori proyek
3. Install dependensi:
   ```
   npm install
   ```
4. Set up database MySQL Anda dan update file `.env` dengan kredensial yang sesuai
5. Jalankan skrip SQL di `init.sql` untuk membuat tabel yang diperlukan
6. Jalankan aplikasi:
   ```
   npm run dev
   ```

## Penggunaan API

### Products Endpoints

1. Get all products

   - GET `/api/products`

2. Create a product

   - POST `/api/products`
   - Body:
     ```json
     {
       "name": "Product Name",
       "price": 10000,
       "stock": 100
     }
     ```

3. Get a single product

   - GET `/api/products/{id}`

4. Update a product

   - PUT `/api/products/{id}`
   - Body:
     ```json
     {
       "name": "Updated Product Name",
       "price": 15000,
       "stock": 150
     }
     ```

5. Delete a product
   - DELETE `/api/products/{id}`

### Orders Endpoints

1. Get all orders

   - GET `/api/orders`

2. Create an order

   - POST `/api/orders`
   - Body:
     ```json
     {
       "products": [
         {
           "id": 1,
           "quantity": 2
         },
         {
           "id": 2,
           "quantity": 3
         }
       ]
     }
     ```

3. Get a single order

   - GET `/api/orders/{id}`

4. Delete an order
   - DELETE `/api/orders/{id}`

## Testing

Anda dapat menggunakan Postman untuk menguji API. Import collection Postman yang disediakan atau buat request sesuai dengan endpoint yang dijelaskan di atas.

## Kontribusi

Silakan buat issue atau pull request jika Anda ingin berkontribusi pada proyek ini.

## Lisensi

[MIT License](https://opensource.org/licenses/MIT)
