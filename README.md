# A squishable cat cookieclicker thing
Random idea for something to occupy my domain for now

### Steps i took to process the raw video

1. Cropped and trimmed the original webm video with an online tool
2. Used `ffmpeg -i input.webm -c copy output.mp4` to output a mp4 video without quality loss
3. Ran `ffmpeg -i input.mp4 frames/%03d.png` to split the video into (`44`) individual frames
4. Finally used `ImageMagick's` montage tool to make a sprite sheet of 11 columns and 4 rows
	- `montage -mode Concatenate -tile 11x4 -geometry +0+0 frames/*.png output.webp`

**Why 11x4?**
*"The maximum pixel dimensions of a WebP image is 16383x16383"* - [source](https://developers.google.com/speed/webp/faq#what_is_the_maximum_size_a_webp_image_can_be)  
this means that if i would like to have a single row with 44 columns, the WebP image will be too large.  
And WebP for this kind of sprite sheet is a must, the size from a png sprite sheet jumps from 18MB to just 1.4MB

### TODO:
- [x] More boing sounds
- [ ] EVEN MORE BOING SOUNDS
- [ ] Paw cursor
- [ ] Make this an actual game with score tracking
