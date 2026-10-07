import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-plugin',
    configureServer(server) {
      const apiKey = process.env.GEMINI_API_KEY || '';
      let aiClient: GoogleGenAI | null = null;
      if (apiKey) {
        aiClient = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/ai-tutor') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { message, grade, history } = JSON.parse(body || '{}');
              if (!message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Xabar kiritilmadi' }));
                return;
              }

              if (aiClient) {
                const contents = [];
                if (Array.isArray(history)) {
                  for (const h of history.slice(-4)) {
                    contents.push({
                      role: h.sender === 'user' ? 'user' : 'model',
                      parts: [{ text: h.text }],
                    });
                  }
                }
                contents.push({ role: 'user', parts: [{ text: message }] });

                const response = await aiClient.models.generateContent({
                  model: 'gemini-3.8-flash',
                  contents,
                  config: {
                    systemInstruction: `Siz "Hilola Math" ilovasining do'stona AI Ustozisiz. ${grade || '7-sinf'} o'quvchisiga o'zbek tilida (lotin yozuvida) samimiy, sabrli tushuntiring. "Keling, buni birgalikda bosqichma-bosqich yechamiz." uslubida gapiring. Javob oxirida ilovaning tegishli bo'limlariga taklif bering: [ACTION:LESSON:Mavzu] yoki [ACTION:PRACTICE:Mavzu] yoki [ACTION:TEST:Mavzu] yoki [ACTION:GAME:O'yin nomi].`,
                    temperature: 0.7,
                  },
                });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: response.text }));
                return;
              }
            } catch (err) {
              console.error('API tutor error:', err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: null }));
          });
          return;
        }

        if (req.method === 'POST' && req.url === '/api/solve-problem') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { problem, grade } = JSON.parse(body || '{}');
              if (!problem) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Masala kiritilmadi' }));
                return;
              }

              if (aiClient) {
                const response = await aiClient.models.generateContent({
                  model: 'gemini-3.8-flash',
                  contents: `Masalani bosqichma-bosqich yechib bering:\n${problem}`,
                  config: {
                    systemInstruction: `Siz "Hilola Math" ilovasida ishlovchi professional matematika yechuvchisiz.
Javobni quyidagi aniq sarlavhalar bilan O'zbek tilida (lotin yozuvida) yozing:
### 1-qadam: Masalada nima berilganini aniqlash
### 2-qadam: Kerakli formula yoki usulni tanlash
### 3-qadam: Bosqichma-bosqich hisoblash
### 4-qadam: Natijani tekshirish
### Yakuniy Javob
### Tushuntirish`,
                    temperature: 0.2,
                  },
                });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ solution: response.text }));
                return;
              }
            } catch (err) {
              console.error('API solver error:', err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ solution: null }));
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

