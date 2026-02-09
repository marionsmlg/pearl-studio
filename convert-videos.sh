#!/bin/bash

# Script de conversion WebM → MP4 pour Safari iOS
# Usage: ./convert-videos.sh

echo "🎥 Conversion des vidéos WebM → MP4 pour Safari iOS"
echo "=================================================="
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
total=$(ls -1 *.webm 2>/dev/null | wc -l)
current=0

if [ "$total" -eq 0 ]; then
    echo "❌ Aucun fichier WebM trouvé dans public/videos/"
    exit 1
fi

echo "📹 $total vidéo(s) à convertir"
echo ""

# Convertir chaque fichier WebM
for file in *.webm; do
    current=$((current + 1))
    output="${file%.webm}.mp4"

    # Vérifier si le fichier MP4 existe déjà
    if [ -f "$output" ]; then
        echo "⏭️  [$current/$total] $output existe déjà, ignoré"
        continue
    fi

    echo "🔄 [$current/$total] Conversion de $file..."

    # Conversion avec paramètres optimisés pour Safari iOS
    ffmpeg -i "$file" \
        -c:v libx264 \
        -profile:v baseline \
        -level 3.0 \
        -pix_fmt yuv420p \
        -vf "scale='min(1920,iw)':'-2'" \
        -movflags +faststart \
        -crf 23 \
        -an \
        -y \
        "$output" \
        -hide_banner -loglevel error

    if [ $? -eq 0 ]; then
        # Afficher les tailles
        size_webm=$(du -h "$file" | cut -f1)
        size_mp4=$(du -h "$output" | cut -f1)
        echo "   ✅ $file ($size_webm) → $output ($size_mp4)"
    else
        echo "   ❌ Erreur lors de la conversion de $file"
    fi

    echo ""
done

echo "=================================================="
echo "✅ Conversion terminée !"
echo ""
echo "📊 Fichiers créés :"
ls -lh *.mp4
echo ""
echo "📝 Prochaines étapes :"
echo "1. Tester localement : npm run dev"
echo "2. Commit : git add public/videos/*.mp4"
echo "3. Push : git push"
