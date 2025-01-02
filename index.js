const { createClient } = require('bedrock-protocol');

// Fungsi untuk memulai bot
function startBot() {
  const client = createClient({
    host: 'serverbot2025.aternos.me', // Alamat server
    port: 20153,                      // Port server
    username: 'IsraModeCover',        // Nama bot
    offline: true,                    // Mode offline
    cacheDir: './auth-cache',         // Lokasi penyimpanan token
  });

  // Event: Ketika bot berhasil masuk ke server
  client.on('join', () => {
    console.log('Bot berhasil masuk ke server!');
    simulateMovement(client); // Memulai simulasi gerakan
  });

  // Event: Ketika bot keluar dari server
  client.on('end', () => {
    console.log('Bot terputus dari server. Mencoba menyambung kembali...');
    setTimeout(startBot, 5000); // Tunggu 5 detik sebelum mencoba kembali
  });

  // Event: Ketika terjadi kesalahan
  client.on('error', (err) => {
    console.error('Terjadi kesalahan:', err.message);
    console.error('Pastikan server online dan alamat/port benar.');
  });
}

// Fungsi untuk simulasi gerakan kecil agar bot tidak dianggap AFK
function simulateMovement(client) {
  setInterval(() => {
    // Gerakan kecil di sekitar posisi bot
    const randomX = Math.random() * 2 - 1; // Nilai acak antara -1 hingga 1
    const randomZ = Math.random() * 2 - 1;
    const newPosition = {
      x: client.entity.position.x + randomX,
      y: client.entity.position.y,
      z: client.entity.position.z + randomZ,
    };

    // Kirim perintah gerakan ke server
    client.queue('move_player', {
      runtimeId: client.entity.runtimeId,
      position: newPosition,
      pitch: client.entity.pitch,
      yaw: client.entity.yaw,
      headYaw: client.entity.headYaw,
      mode: 0, // Mode normal
      onGround: true,
      teleportCause: 0,
      entityType: 0,
    });

    console.log(`Bot bergerak sedikit ke posisi baru: ${JSON.stringify(newPosition)}`);
  }, 30000); // Setiap 30 detik
}

// Memulai bot
startBot();
