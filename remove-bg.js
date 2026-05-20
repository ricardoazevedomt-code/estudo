const { Jimp } = require('jimp');

async function processImage() {
  try {
    const image = await Jimp.read('public/logo.png');
    
    // Check if image width/height exist
    if (!image.bitmap || !image.bitmap.data) {
      console.error('Failed to read image correctly');
      return;
    }
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      }
    });
    
    await image.write('public/logo_transparent.png');
    console.log('Successfully saved transparent logo');
  } catch (err) {
    console.error('Error:', err);
  }
}

processImage();
