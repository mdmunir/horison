const {GifWriter} = require('omggif');

export function generateGIF(element, renderFunction, options={}) {
    const duration = options.duration || 10;
    const fps = options.fps || 30;
    const depth = options.depth || 25;
    
    const frames = duration * fps;

    const canvas = document.createElement('canvas');
    canvas.width = element.width;
    canvas.height = element.height;

    const context = canvas.getContext('2d');

    const buffer = new Uint8Array(canvas.width * canvas.height * frames * 5);
    const pixels = new Uint8Array(canvas.width * canvas.height);
    const writer = new GifWriter(buffer, canvas.width, canvas.height, {loop: 0});

    let current = 0;
    return new Promise(async function addFrame(resolve) {
        renderFunction(current/frames);
        context.drawImage(element, 0, 0);
        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const palette = [];

        for (var j = 0, k = 0, jl = data.length; j < jl; j += 4, k++) {
            const r = Math.floor(data[ j + 0 ] / depth) * depth;
            const g = Math.floor(data[ j + 1 ] / depth) * depth;
            const b = Math.floor(data[ j + 2 ] / depth) * depth;
            const color = r << 16 | g << 8 | b << 0;

            const index = palette.indexOf(color);
            if (index === -1) {
                pixels[ k ] = palette.length;
                palette.push(color);
            } else {
                pixels[ k ] = index;
            }
        }

        // Force palette to be power of 2
        let powof2 = 1;
        while (powof2 < palette.length) {
            powof2 <<= 1;
        }
        palette.length = powof2;

        const delay = 100 / fps; // Delay in hundredths of a sec (100 = 1s)
        const options = {palette: new Uint32Array(palette), delay: delay};
        writer.addFrame(0, 0, canvas.width, canvas.height, pixels, options);

        current++;
        if (options.callback) {
            options.callback(current / frames);
        }
        if (current < frames) {
            await setTimeout(addFrame, 0, resolve);
        } else {
            resolve(buffer.subarray(0, writer.end()));
        }
    });
}

export default {
    generateGIF
}