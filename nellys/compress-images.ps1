# ============================================================
#  Nelly's - Image Compression + WebP Converter
#  Run this script once after installing ImageMagick:
#    https://imagemagick.org/script/download.php#windows
#
#  What it does:
#    - Converts every JPG/PNG in images/exterior and images/food
#      to a compressed WebP at ~85% quality (~80-90% smaller)
#    - Leaves the originals untouched (safe to re-run)
#    - The website automatically uses WebP if it exists,
#      falls back to the original if not
# ============================================================

$ErrorActionPreference = "Stop"

$folders = @(
    "images\exterior",
    "images\food"
)

$quality = 85   # 0-100, 85 is a great balance of quality vs size

$converted = 0
$skipped   = 0

foreach ($folder in $folders) {
    $fullPath = Join-Path $PSScriptRoot $folder
    if (-not (Test-Path $fullPath)) { continue }

    $images = Get-ChildItem $fullPath -Include "*.jpg","*.jpeg","*.png" -Recurse
    foreach ($img in $images) {
        $webp = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
        if (Test-Path $webp) {
            Write-Host "  SKIP (already exists): $($img.Name)"
            $skipped++
            continue
        }
        Write-Host "  Converting: $($img.Name) -> $([System.IO.Path]::GetFileName($webp))"
        & magick $img.FullName -quality $quality $webp
        $converted++
    }
}

Write-Host ""
Write-Host "Done. Converted: $converted  |  Skipped (already WebP): $skipped"
Write-Host "The site will automatically serve WebP where available."
