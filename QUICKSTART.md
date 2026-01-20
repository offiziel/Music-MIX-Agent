# 🚀 Quick Start Guide - Mix Mentor AI v3.0

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+
- Claude API Key ([Get one here](https://console.anthropic.com))
- FFmpeg (for audio conversion)

## 1. Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 2. Configure Environment Variables

### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your Claude API key:
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

No changes needed if running locally on default ports.

## 3. Start the Application

Open **two terminal windows**:

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
🎵  MIX MENTOR AI v3.0 Backend  🎵
[Server] Running on http://localhost:3001
[Server] Claude API: ✓ Configured
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 4. Open in Browser

Navigate to: **http://localhost:5173**

## 5. First Test

1. Click **Dashboard** tab
2. Select a style (e.g., **AGGRO BERLIN**)
3. Choose vocal type (**Main Vocals**)
4. Click **SPUR / SONG LADEN** to upload an audio file
5. Wait for analysis to complete (~10-30 seconds)
6. Review the AI-generated mixing instructions!

## 🎉 You're Ready!

Switch between tabs:
- **Dashboard** - Audio analysis and overview
- **Studio Suite** - Detailed plugin parameters
- **Master Guide** - Production workflow tips

## 🐛 Troubleshooting

### Backend won't start
- Make sure Node.js 18+ is installed: `node --version`
- Check if port 3001 is free: `lsof -i :3001` (Mac/Linux)
- Delete `node_modules` and run `npm install` again

### Frontend won't start
- Make sure backend is running first
- Check if port 5173 is free
- Clear browser cache and reload

### Upload fails
- Install FFmpeg: `brew install ffmpeg` (Mac) or `sudo apt install ffmpeg` (Linux)
- Check file size is under 100MB
- Try WAV format for best compatibility

### AI not responding
- Verify `ANTHROPIC_API_KEY` is set in `backend/.env`
- Check your Claude API credits at console.anthropic.com
- Look for errors in backend terminal

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore all 4 mixing styles
- Test with different vocal types
- Check out the Master Guide tab for workflow tips

## 💬 Need Help?

- Open an issue on GitHub
- Check the Troubleshooting section in README.md
- Join our Discord community

---

**Happy Producing! 🎵**
