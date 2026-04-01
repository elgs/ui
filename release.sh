#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 1.0.0"
  exit 1
fi

VERSION="$1"
TAG="v$VERSION"

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: Tag $TAG already exists."
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working directory is not clean. Commit or stash changes first."
  exit 1
fi

# Update version.json
echo "Updating version.json..."
cat > version.json <<EOF
{
  "version": "$TAG"
}
EOF
git add version.json

# Bundle all themes into a single file
echo "Bundling themes..."
THEMES_BUNDLE="src/themes.css"
> "$THEMES_BUNDLE"
for file in src/themes/*.css; do
  cat "$file" >> "$THEMES_BUNDLE"
  echo "" >> "$THEMES_BUNDLE"
done
echo "Created $THEMES_BUNDLE"

git add "$THEMES_BUNDLE"
git commit -m "Release $TAG"

git tag -a "$TAG" -m "Release $TAG"
git push origin "$TAG"
git push origin HEAD

echo ""
echo "Released $TAG"
echo ""
echo "CDN URLs:"
echo "  https://cdn.jsdelivr.net/gh/az-code-lab/ui@$TAG/src/ui.css"
echo "  https://cdn.jsdelivr.net/gh/az-code-lab/ui@$TAG/src/themes.css"
