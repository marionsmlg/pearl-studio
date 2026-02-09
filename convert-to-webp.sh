#!/bin/bash

# Script de conversion MP4 → WebP animé pour Safari iOS autoplay
# Usage: ./convert-to-webp.sh

echo "🎬 Conversion des vidéos MP4 → WebP animé pour Safari iOS"
echo "=========================================================="
echo ""

cd public/videos || exit 1

# Vérifier si ffmpeg est installé
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg n'est pas installé !"
    echo ""
    echo "Installation :"
    echo "  macOS:   brew install ffmpeg"
    echo "  Ubuntu:  sudo apt install ffmpeg"
    echo "  Windows: choco install ffmpeg"
    exit 1
fi

# Compter les fichiers
total=$(ls -1 *.mp4 2>/dev/null | wc -l)
current=0

if [ "$total" -eq 0 ]; then
    echo "❌ Aucun fichier MP4 trouvé dans public/videos/"
    exit 1
fi

echo "📹 $total vidéo(s) à convertir"
echo ""

# Convertir chaque fichier MP4 en WebP animé
for file in *.mp4; do
    current=$((current + 1))
    output="${file%.mp4}.webp"

    # Vérifier si le fichier WebP existe déjà
    if [ -f "$output" ]; then
        echo "⏭️  [$current/$total] $output existe déjà, ignoré"
        continue
    fi

    echo "🔄 [$current/$total] Conversion de $file..."

    # Conversion optimisée pour Safari iOS
    # - Réduction à 30fps pour réduire la taille
    # - Quality 80 (bon équilibre taille/qualité)
    # - Résolution max 1920px de largeur
    ffmpeg -i "$file" \
        -vf "fps=30,scale='min(1920,iw)':-2" \
        -vcodec libwebp \
        -lossless 0 \
        -compression_level 6 \
        -q:v 80 \
        -loop 0 \
        -preset default \
        -an \
        -vsync 0 \
        "$output" \
        -hide_banner -loglevel error

    if [ $? -eq 0 ]; then
        # Afficher les tailles
        size_mp4=$(du -h "$file" | cut -f1)
        size_webp=$(du -h "$output" | cut -f1)
        echo "   ✅ $file ($size_mp4) → $output ($size_webp)"
    else
        echo "   ❌ Erreur lors de la conversion de $file"
    fi

    echo ""
done

echo "=========================================================="
echo "✅ Conversion terminée !"
echo ""
echo "📊 Fichiers créés :"
ls -lh *.webp 2>/dev/null || echo "Aucun fichier WebP créé"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Les WebP animés sont prêts !"
echo "2. Le code va être mis à jour automatiquement"
echo "3. Test local : npm run dev"
echo "4. Commit : git add public/videos/*.webp"
echo "5. Push : git push"
