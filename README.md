# PromptKits – Prompt Enhancer

## File structure
```
promptkits/
├── index.html         ← Frontend (no API key here — safe to push to GitHub)
├── api/
│   └── enhance.js     ← Backend serverless function (API key stored in Vercel)
├── vercel.json        ← Vercel config
└── README.md
```

---

## Deploy steps

### 1. Push to GitHub (no API key in code — safe!)
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/promptkits.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com
2. New Project → Import your GitHub repo
3. Click Deploy

### 3. Add API key as environment variable in Vercel
1. Vercel dashboard → your project → Settings → Environment Variables
2. Add new variable:
   - Name:  ANTHROPIC_API_KEY
   - Value: sk-ant-api03-xxxxxxxx  (your actual key)
3. Click Save
4. Go to Deployments → click the 3 dots → Redeploy

### 4. Connect your domain
1. Vercel → Settings → Domains → add promptkits.in
2. Copy DNS records → paste in GoDaddy
3. Done in 10–30 mins

### 5. Add Google AdSense
After approval, replace the ad placeholder comments in index.html with your ad unit codes.
