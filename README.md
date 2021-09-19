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
    //size replaces both width and height default is "500px" for illustrations and "1em" for icons if not set
    //size: `700`,
    width: '700',
    height: '700',
    color: 'teal' // default "currentColor"
    // if the library has 2 or 3 colors use the following keys
    // color1: '#282F4F'
    // color2: '#157075' 
    // color3: '#803155'
  };
</script>

<SvelteGraphics {SvelteGraphic} {SvelteGraphicSpecs} />
```

**Note:** `id`, `lib` and `color` are reactive by design, feel free to bind them to user inputs.

## Available Libraries

### Icons

- MaterialDesign - original icons at [materialdesignicons.com](https://materialdesignicons.com).

### Illustrations (illus)

- unDraw - original illustrations at [undraw.co](https://undraw.co).
- Scale - single color illustrations at [https://2.flexiple.com/scale/all-illustrations](https://2.flexiple.com/scale/all-illustrations).
- ScaleMulti - Multi-color illustrations at [https://2.flexiple.com/scale/multi-color-illustrations](https://2.flexiple.com/scale/multi-color-illustrations).
- ScaleMultiMask - Same illustrations as above but with characters wearing masks.

**Note**: File names are PascalCased from the original SVG names:

- **Attached file** converts to **AttachedFile.svelte**  
- **ab-testing** converts to **AbTesting**

## Notes

If you wrap the graphics into other element set the **display** of the parent element to **flex**.

## Work in progress

- Add more libraries.
- Launch a webpage for easier viewing and usage.

## Planned Work

- Add SkinTone for certain libraries.

## Contribute

This is a compiler that transforms the SVG files to svelte components utilizing [cheerio](https://cheerio.js.org).

To develop:

```sh
git clone https://github.com/mohadel1990/sveltegraphics.git
cd sveltegraphics
npm i
npm run build
```

- To add a new library add the SVG files to a folder named identical to the library name.
- Copy the library folder to `/sources/illustrations` or `/sources/icons` depending on the library type.
- Update sources.json as seen in the below example.

```json
{
  "illustrations": {
    "example-single-color" : {
      "color" : "#c1d61f"
    },
    "example-double-colors" : {
      "color1":"#08cbd9",
      "color2": "#c013c3"
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

## Credits

- The project was inspired/based on the work done by [svelte-material-icons](https://github.com/ramiroaisen/svelte-material-icons).
