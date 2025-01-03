# Gunakan Node.js versi stabil
FROM node:18

# Instal alat build yang diperlukan
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    g++ \
    cmake

# Buat direktori aplikasi
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm ci

# Salin semua file ke container
COPY . .

# Ekspose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
