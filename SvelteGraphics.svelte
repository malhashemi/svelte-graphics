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
	let PrimaryColor;
	let SecondaryColor;
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
	$: PrimaryColor = SvelteGraphicSpecs.PrimaryColor ? SvelteGraphicSpecs.PrimaryColor : color;
	$: SecondaryColor = SvelteGraphicSpecs.SecondaryColor ? SvelteGraphicSpecs.SecondaryColor : color;
	//let viewBox = SvelteGraphicSpecs.viewBox ? SvelteGraphicSpecs.viewBox : `0 0 24 24`;


	
	$: path = `./${type}/${lib}/${graphic}.svelte`;
	$: import(/* @vite-ignore */path).then((res) => (modules = res.default)); 

</script>

<svelte:component this={modules} {color} {PrimaryColor} {SecondaryColor} {size} {width} {height} />
