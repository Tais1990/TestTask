import gm from 'gm';
import path from 'path';
import fs from 'fs';

const ignoredFiles = fs
	.readFileSync(`${process.cwd()}/.retinaignore`)
	.toString()
	.split('\n')
	.filter(d => d);

const flatten = list => list.reduce((a, b) =>
	a.concat(
		Array.isArray(b)
			? flatten(b)
			: b
	)
, []);

const readAllFilesInDir = (d) => {
	if (fs.statSync(d).isDirectory()) {
		return fs.readdirSync(d).map(f => readAllFilesInDir(path.join(d, f)))
	} else {
		if (!ignoredFiles.some(ignoreFile => (new RegExp(ignoreFile, 'i')).test(d))) {
			return d
		}
	}
};

/*
* Collect all images in project (src/image)
*/
const images = flatten(readAllFilesInDir(`${process.cwd()}/src/image`)).filter(d => d);

/*
* Filtering converted images
*/
const imagesToOptimize = images.reduce((acc, file) => file.includes('@2x.')
	? acc.filter(f => f !== file.replace('@2x.', '.'))
	: [...acc, file]
, []);


for (const imagePath of imagesToOptimize) {

	/*
	* Converting each image
	*/
	gm(imagePath)
		.size({
			bufferStream: true
		}, function (err, size) {
			if (err) {
				throw err
			}

			const [ filePathAndName, fileExt ] = imagePath.split('.');

			/*
			* Write retina image (original size)
			*/
			this.write(`${filePathAndName}@2x.${fileExt}`, function (err) {
				if (!err) console.log(`Write ${filePathAndName}@2x.${fileExt}`);
			});

			this.resize(size.width / 2, size.height / 2);

			/*
			* Write scaled image (50%)
			*/
			this.write(file, function (err) {
				if (!err) console.log(`Write ${filePathAndName}.${fileExt}`);
			});
		});
}
