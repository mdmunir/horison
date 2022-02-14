const fs = require('fs');
const path = require('path');

const distFolder = path.resolve(__dirname, '../dist/_nuxt/');
const outFile = path.resolve(__dirname, '../dist/dist/precache.js');

const files = [];
const revision = Math.floor((new Date).getTime() / 1000);

function run() {
    fs.readdirSync(distFolder).forEach(file => {
        if (file.endsWith('.js')) {
            files.push({revision, url: `/horison/_nuxt/${file}`});
        }
    });

    let str = `const _files = ${JSON.stringify(files)};
_files.forEach(f=>{
    options.preCaching.push(f);
});
`;

    fs.writeFileSync(outFile, str, "utf8");
}

module.exports = run;