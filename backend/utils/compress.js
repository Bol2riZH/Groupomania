const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

exports.compress = async (file, folder) => {
  const outputFile = `${file.split('.').slice(0, -1)}.webp`;
  const filePath = path.join(__dirname + `/../images/${folder}/${outputFile}`);
  await sharp(path.join(__dirname + `/../images/${folder}/` + file))
    .webp({ quality: 20 })
    .toFile(filePath);
  fs.unlinkSync(path.join(__dirname + `/../images/${folder}/` + file));
  return outputFile;
};
