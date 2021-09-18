# Svelte Graphics

The only svelte graphics package you will ever need.

## Install

```sh
npm i svelte-graphics
```

## Usage

```svelte
<script>
  import SvelteGraphics from "svelte-graphics";

  let SvelteGraphic = {
    id: `AcceptTasks`, //Graphic Name
    type: `illus`, // icon or illus (illustrations)
    lib: `unDraw` // Library Name
  };
  
  let SvelteGraphicSpecs = {
    //size: `500`,
    width: '500',
    height: '500',
    color: 'teal'
     //if the library has 2 colors use PrimaryColor and SecondaryColor
    // PrimaryColor: '#6C63FF'
    // SecondaryColor: '#2b3752' 
  };
</script>

<SvelteGraphics {SvelteGraphic} {SvelteGraphicSpecs} />
```

## Available Libraries

### Icons

- MaterialDesign - find icons at [materialdesignicons.com](https://materialdesignicons.com)

### Illustrations (illus)

- unDraw - find illustrations at [undraw.co](https://undraw.co)

**Note**: File names are PascalCased from the original SVG names:

- **Attached file** converts to **AttachedFile.svelte**  
- **ab-testing** converts to **AbTesting**

## Notes

If you wrap the graphics into other element set the **display** of the parent element to **flex**

## Work in progress

- Add more libraries.
- Launch a webpage for easier viewing and usage.

## Contribute

This is a compiler that transforms the SVG files to svelte components utilizing [cheerio](https://cheerio.js.org)

To develop

```sh
git clone https://github.com/mohadel1990/sveltegraphics.git
cd sveltegraphics
npm i
npm run build
```

- To add a new library add the SVG files to a folder named identical to the library name
- Copy the library folder to `/sources/illustrations` or `/sources/icons` depending on the library type.
- Update sources.json as seen in the below example

```json
{
  "illustrations": {
    "example-single-color" : {
      "color" : "#c1d61f"
    },
    "example-double-colors" : {
      "PrimaryColor":"#08cbd9",
      "SecondaryColor": "#c013c3"
    },
    "unDraw": {
      "color": "#6C63FF"
    }
  },
  "icons": {
    "example": {"color":"black"},
    "example2": {},
    "MaterialDesign": {}
  }
}
```

**Note:** attributes "empty, color, PrimaryColor or SecondaryColor" is set according to the original SVG.

## Credits

- The project was inspired/based on the work done by [svelte-material-icons](https://github.com/ramiroaisen/svelte-material-icons).
