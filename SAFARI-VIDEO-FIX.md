# 🎥 Fix Safari iOS - Conversion Vidéos WebM → MP4

## Problème

Safari sur iOS ne supporte **pas bien le format WebM**. Il faut convertir les vidéos en MP4 (H.264).

## Solution Rapide

### Option 1 : Conversion avec ffmpeg (Recommandé)

**Installation ffmpeg** :
```bash
# macOS
brew install ffmpeg

# Windows (avec Chocolatey)
choco install ffmpeg

# Linux (Ubuntu/Debian)
sudo apt install ffmpeg
```

**Convertir toutes les vidéos** :
```bash
cd public/videos

# Pour chaque vidéo WebM, créer une version MP4
for file in *.webm; do
  ffmpeg -i "$file" \
    -c:v libx264 \
    -profile:v baseline \
    -level 3.0 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -crf 23 \
    -an \
    "${file%.webm}.mp4"
done
```

**Explication des paramètres** :
- `-c:v libx264` : Codec H.264 (compatible Safari)
- `-profile:v baseline -level 3.0` : Compatible tous les appareils iOS
- `-pix_fmt yuv420p` : Format de pixels compatible Safari
- `-movflags +faststart` : Optimisé pour streaming web
- `-crf 23` : Qualité (18-28, 23 = bon équilibre)
- `-an` : Pas d'audio (vos vidéos n'ont pas de son)

### Option 2 : Conversion une par une

```bash
cd public/videos

# 0g.webm → 0g.mp4
ffmpeg -i "0g.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "0g.mp4"

# ALS.webm → ALS.mp4
ffmpeg -i "ALS.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "ALS.mp4"

# Black Signal.webm → Black Signal.mp4
ffmpeg -i "Black Signal.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Black Signal.mp4"

# Praesio.webm → Praesio.mp4
ffmpeg -i "Praesio.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Praesio.mp4"

# Vectra Labs.webm → Vectra Labs.mp4
ffmpeg -i "Vectra Labs.webm" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart -crf 23 -an "Vectra Labs.mp4"
```

### Option 3 : Outil en ligne (sans installation)

**CloudConvert** : https://cloudconvert.com/webm-to-mp4

1. Upload vos fichiers WebM
2. Sélectionnez MP4 comme format de sortie
3. Dans "Options" :
   - Codec Video : H.264
   - Profile : Baseline
   - Quality : High (85-90%)
   - Audio : Remove
4. Convertir et télécharger

**Astuce** : CloudConvert permet de convertir plusieurs fichiers en batch (payant après quelques conversions gratuites).

## Optimisation Recommandée

En plus de la conversion, réduisez la taille :

```bash
# Réduire la résolution à 1920px de largeur max
ffmpeg -i "input.webm" \
  -c:v libx264 \
  -profile:v baseline \
  -level 3.0 \
  -pix_fmt yuv420p \
  -vf "scale='min(1920,iw)':'-2'" \
  -movflags +faststart \
  -crf 23 \
  -an \
  "output.mp4"
```

**Résultat attendu** :
- Black Signal.webm (28MB) → Black Signal.mp4 (8-12MB)
- Autres vidéos : 2-5MB chacune

## Après Conversion

1. **Vérifier les fichiers** :
```bash
ls -lh public/videos/
# Vous devriez voir .webm ET .mp4 pour chaque vidéo
```

2. **Tester localement** :
```bash
npm run dev
# Ouvrir dans Safari
```

3. **Commit et push** :
```bash
git add public/videos/*.mp4
git commit -m "Add MP4 versions of videos for Safari iOS compatibility"
git push
```

## Pourquoi MP4 ?

| Format | Support Safari iOS | Poids | Qualité |
|--------|-------------------|-------|---------|
| WebM (VP9) | ❌ Partiel/Buggy | Léger | Excellente |
| MP4 (H.264) | ✅ **100%** | Moyen | Très bonne |

**Safari iOS impose** :
- Codec : H.264 (pas VP9)
- Profile : Baseline (pas High)
- Container : MP4 (pas WebM)

## Vérification

Après conversion, testez sur :
- ✅ iPhone Safari
- ✅ iPad Safari
- ✅ macOS Safari
- ✅ Chrome (devrait utiliser WebM)
- ✅ Firefox (devrait utiliser WebM)

Le code que j'ai ajouté dans `Creations.tsx` utilise maintenant :
```html
<source src="video.mp4" type="video/mp4" />  <!-- Safari iOS -->
<source src="video.webm" type="video/webm" /> <!-- Autres -->
```

Safari iOS choisira automatiquement le MP4 !

## Alternative Temporaire (sans conversion)

Si vous ne pouvez pas convertir maintenant, utilisez des images statiques :

```bash
# Extraire une frame de chaque vidéo comme poster
ffmpeg -i "0g.webm" -vf "select='eq(n,0)'" -frames:v 1 "../images/0g-poster.webp"
```

Puis modifiez le code pour afficher l'image avec un message.

---

**Temps estimé** : 10-15 minutes pour convertir toutes les vidéos
**Gain** : 100% de compatibilité Safari iOS ✅
