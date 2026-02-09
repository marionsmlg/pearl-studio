# 🚨 FIX URGENT - Vidéos Safari iOS

## Le Problème

Les vidéos ne s'affichent pas sur Safari iOS (rectangle blanc) car Safari ne supporte pas bien le format WebM.

## La Solution Rapide (5-10 minutes)

### Étape 1 : Installer ffmpeg

**macOS** :
```bash
brew install ffmpeg
```

**Ubuntu/Linux** :
```bash
sudo apt install ffmpeg
```

**Windows** :
- Télécharger : https://ffmpeg.org/download.html
- Ou avec Chocolatey : `choco install ffmpeg`

### Étape 2 : Convertir les vidéos

```bash
# Dans le dossier du projet
./convert-videos.sh
```

Le script va créer automatiquement des versions MP4 de toutes vos vidéos WebM.

### Étape 3 : Vérifier

```bash
ls -lh public/videos/
# Vous devriez voir .webm ET .mp4 pour chaque vidéo
```

### Étape 4 : Tester

```bash
npm run dev
# Ouvrir http://localhost:4321/creations
# Vérifier que les vidéos s'affichent
```

### Étape 5 : Déployer

```bash
git add public/videos/*.mp4
git commit -m "Add MP4 videos for Safari iOS"
git push
```

Netlify redéploiera automatiquement avec les nouvelles vidéos !

---

## Alternative : Conversion Manuelle

Si le script ne fonctionne pas, convertissez manuellement :

```bash
cd public/videos

# Pour chaque vidéo
ffmpeg -i "0g.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "0g.mp4"

ffmpeg -i "ALS.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "ALS.mp4"

ffmpeg -i "Black Signal.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Black Signal.mp4"

ffmpeg -i "Praesio.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Praesio.mp4"

ffmpeg -i "Vectra Labs.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Vectra Labs.mp4"
```

---

## Alternative Sans ffmpeg : Outil en ligne

**CloudConvert** (gratuit pour quelques conversions) :
https://cloudconvert.com/webm-to-mp4

1. Upload vos 5 fichiers WebM
2. Convertir en MP4 (H.264, Quality: High)
3. Télécharger et placer dans `public/videos/`

---

## Résultat Attendu

```
public/videos/
├── 0g.webm (8.9M)
├── 0g.mp4 (nouveau)
├── ALS.webm (6.6M)
├── ALS.mp4 (nouveau)
├── Black Signal.webm (28M)
├── Black Signal.mp4 (nouveau)
├── Praesio.webm (4.5M)
├── Praesio.mp4 (nouveau)
├── Vectra Labs.webm (8.8M)
└── Vectra Labs.mp4 (nouveau)
```

Le code détectera automatiquement le MP4 sur Safari iOS !

---

**Temps total** : 5-10 minutes
**Impact** : ✅ Vidéos fonctionnent sur Safari iOS
