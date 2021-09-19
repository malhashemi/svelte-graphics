<script>
	export let SvelteGraphic = {
		id: ``,
		lib: ``
	};
	export let SvelteGraphicSpecs = {};

	let graphic;
	let lib;
	let type;

	let size;
	let width;
	let height;
	let color;
	let color1;
	let color2;
	let color3;
	let modules;
	let path;

	$: graphic = SvelteGraphic.id;
	type = SvelteGraphic.type;
	$: lib = SvelteGraphic.lib;

	switch (type) {
		case `icon`:
			type = 'icons';
			size = SvelteGraphicSpecs.size ? SvelteGraphicSpecs.size : `1em`;
			break;
		case `illus`:
			type = 'illustrations';
			size = SvelteGraphicSpecs.size ? SvelteGraphicSpecs.size : `500`;
			break;

		default:
			throw `Invalid Graphic type: ${type}`;
	}

	width = SvelteGraphicSpecs.width ? SvelteGraphicSpecs.width : size;
	height = SvelteGraphicSpecs.height ? SvelteGraphicSpecs.height : size;

	$: color = SvelteGraphicSpecs.color ? SvelteGraphicSpecs.color : `currentColor`;
	$: color1 = SvelteGraphicSpecs.color1 ? SvelteGraphicSpecs.color1 : color;
	$: color2 = SvelteGraphicSpecs.color2 ? SvelteGraphicSpecs.color2 : color;
	$: color3 = SvelteGraphicSpecs.color3 ? SvelteGraphicSpecs.color3 : color;
	//let viewBox = SvelteGraphicSpecs.viewBox ? SvelteGraphicSpecs.viewBox : `0 0 24 24`;


	
	$: path = `./${type}/${lib}/${graphic}.svelte`;
	$: import(/* @vite-ignore */path).then((res) => (modules = res.default)); 

</script>

<svelte:component this={modules} {color} {color1} {color2} {color3} {size} {width} {height} />
