import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // Expose to all network interfaces
    port: 5173,             // Ensure it runs on 5173
    allowedHosts: [
      'localhost',          // Allow local access
      'de36-115-247-127-154.ngrok-free.app', // Allow all ngrok-free.app subdomains (e.g., de36-115-247-127-154.ngrok-free.app)
    ],
  },
});

