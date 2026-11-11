import mongoose from 'mongoose';
import dns from 'node:dns';

// Ensure SRV records resolve reliably on Windows / custom networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // fallback to system default if restricted
}

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI is not set. Copy .env.example to .env and fill it in.');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('MongoDB connected:', mongoose.connection.name);
}
