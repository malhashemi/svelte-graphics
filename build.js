
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const sources = require("./sources.json");

/**
 * Get all folders inside a path
 * @param {*} source - path to scan for folders
 * @returns an array of folder names inside path
 */
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


const srcFolder = __dirname + "/sources/";
const desFolder = __dirname + "/dist/";

//create desFolder in the directory if it doesn't exist
if (!fs.existsSync(desFolder)) {
  fs.mkdirSync(desFolder);
}

//scan folders in the source path
const graphics = getDirectories(srcFolder);

for (let i = 0; i < graphics.length; i++) {


  const currentGraphic = graphics[i];

  //confirm the current directory is properly declared in the sources.json ex: "icons", "illustrations" before processing
  if (sources[currentGraphic]) {

    const currentGraphicDir = getDirectories(srcFolder + currentGraphic);
    const distGraphicDir = desFolder + currentGraphic;
    //create desGraphic in the dist directory if it doesn't exist
    if (!fs.existsSync(distGraphicDir)) {
      fs.mkdirSync(distGraphicDir);
    }

    for (let i = 0; i < currentGraphicDir.length; i++) {
      const library = currentGraphicDir[i];
      let sourcesObj = sources[currentGraphic][library];

      //confirm the current library is declared in the sources.json ex: "unDraw" before proceeding
      if (sourcesObj) {

        const allowedAttrs = ["width", "height", "viewBox"];

        // Define template based on "no color", "color" or "PrimaryColor and SecondaryColor"
        let template;
        if (("PrimaryColor" in sourcesObj)) {
          template = fs.readFileSync(__dirname + "/template-2-colors.svelte", "utf8");
        } else {
          template = fs.readFileSync(__dirname + "/template.svelte", "utf8");
        }


        const srcDir = srcFolder + currentGraphic + "/" + library;
        const destDir = desFolder + currentGraphic + "/" + library;

        //create library folder in the destination directory if it doesn't exist
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir);
        }



        /**
         * Generates File Name
         * @param {*} svgName 
         * @returns Generated Name
         */
        const generateName = (svgName) => {
          let name = svgName.replace(".svg", "");
          let helper = "";

          let upper = true;

          for (let i = 0; i < name.length; i++) {

            const charCode = name.charCodeAt(i);

            if (charCode === hyp) {
              upper = true;
              continue;
            }

            let char = String.fromCharCode(charCode);

            if (upper)
              char = char.toUpperCase();

            helper += char;

            upper = false;
          }

          return helper;
        }

        /**
     * Automatically calls by `generateName` to create svelte file name
     * @param {*} svgName 
     * @returns Generated component Name
     */
        const generateComponentFilename = (svgName) => {

          let name = generateName(svgName);
          return name + ".svelte";
        }

        /**
         * change specific color inside svg file to "{color}", "{PrimaryColor}"  or "{SecondaryColor}" depending on sources.json file
         * @param {} str svgFile Text 
         * @param {} oldColor - SourceColor from JSON
         * @param {} newColor - Target keyword "{color}", "{PrimaryColor}"  or "{SecondaryColor}" from JSON
         * @returns 
         */
        function recolor(str, oldColor, newColor) {

          let pattern = new RegExp(oldColor, 'g');
          str = str.replaceAll(pattern, newColor);
          return str
        }

        //Char code used to replace "-" in file name
        const hyp = "-".charCodeAt(0);

        /**
         * Generate svelte file from SVG using template.svelte
         * @param {*} file - SVG File
         * @param {*} name - FileName used to add \<title\> to the svelte component
         * @returns svelte component
         */
        const generateComponentSource = (file, name) => {
          // replace colors if defined in the sources.json
          for (const [key, value] of Object.entries(sourcesObj)) {
            const newColor = "{" + key + "}"
            const oldColor = value;
            file = recolor(file, oldColor, newColor);
          }

          const $ = cheerio.load(file);
          const $svg = $("svg");

          let attrs = $svg.attr();
          for (const attr in attrs) {
            // remove unused attrs
            if (!allowedAttrs.includes(attr)) {
              $svg.removeAttr(attr);
            }
          }

          //remove previous title if exists
          $('title').remove();

          // Add attrs
          $svg.attr("width", "{width}");
          $svg.attr("height", "{height}");

          //add \<title\> to the component body
          name = generateName(name);
          $svg.prepend('<title>' + name + '</title>');

          // add fill color attr if empty in sources.json
          if (sourcesObj && Object.keys(sourcesObj).length === 0 && sourcesObj.constructor === Object) {
            const $path = $svg.find("> path");
            $path.attr("fill", "{color}");
          }

          return template.replace("%svg%", $.html($svg));
        }


        const filenames = fs.readdirSync(srcDir);
        console.log("Generating " + filenames.length + " components for " + library + " library");

        //iterate through svg files and create svelte components
        for (let i = 0; i < filenames.length; i++) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write("Component" + ("" + (i + 1)).padStart(5, " ") + " / " + filenames.length);

          const filename = filenames[i];
          const file = fs.readFileSync(path.join(srcDir, filename), "utf8");
          const componentFilename = generateComponentFilename(filename);
          const componentSource = generateComponentSource(file, filename);

          fs.writeFileSync(
            path.join(destDir, componentFilename),
            componentSource
          );

        }

        process.stdout.write("\n");
      }
    }
  }
}

// copy readme file
console.log("Copying README.md to npm package");

// npm does not support ```svelte so change it to ```html
const readmeSrc = fs.readFileSync(__dirname + "/README.md", "utf8");
const readme = readmeSrc.replace(/\`\`\`svelte/g, "```html");
fs.writeFileSync(path.join(desFolder, "README.md"), readme);

// copy SvelteGraphics.svelte main component to npm package folder
console.log("Copying SvelteGraphics.svelte to npm package");
const SvelteGraphics = fs.readFileSync(__dirname + "/SvelteGraphics.svelte", "utf8");
fs.writeFileSync(path.join(desFolder, "SvelteGraphics.svelte"), SvelteGraphics);

// Generate package.json for dist folder
console.log("Generating package.json for dist folder");
const packageSrc = fs.readFileSync(__dirname + "/package.json", "utf8");

let packageParser = JSON.parse(packageSrc); 
delete packageParser["scripts"]; 
delete packageParser["bugs"]; 
delete packageParser["dependencies"];

packageParser.main = "SvelteGraphics.svelte"
let packageDes = JSON.stringify(packageParser, null, 2);

fs.writeFileSync(path.join(desFolder, "package.json"), packageDes);

console.log("Bye!");
