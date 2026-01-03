
Add-Type -AssemblyName System.Drawing

$sourcePath = "logo_latest.png"
$destPath = "logo_latest_transparent.png"

# Load the image
$img = [System.Drawing.Bitmap]::FromFile($sourcePath)

# Create a new bitmap with the same dimensions
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$graph = [System.Drawing.Graphics]::FromImage($bmp)

# Draw the original image onto the new bitmap
$graph.DrawImage($img, 0, 0, $img.Width, $img.Height)

# Make white transparent
# We will use a color key approach or straight MakeTransparent
$bmp.MakeTransparent([System.Drawing.Color]::White)

# Save
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$graph.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Background removed and saved to $destPath"
