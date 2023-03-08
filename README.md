# A squishable cat cookieclicker thing
Random idea for something to occupy my domain for now

### Steps i took to process the raw video

1. Cropped and trimmed the original webm video with an online tool
2. Used `ffmpeg -i input.webm -c copy output.mp4` to output a mp4 video without quality loss
3. Ran `ffmpeg -i input.mp4 frames/%03d.png` to split the video into (`44`) individual frames
4. Finally used `ImageMagick's` montage tool to join them into a one single row with 44 columns, making a sprite sheet
	- `montage -mode Concatenate -tile 44x1 -geometry +0+0 frames/*.png output.png`
