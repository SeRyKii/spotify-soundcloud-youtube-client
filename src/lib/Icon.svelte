<script>
	export let size = '24px';
	export let width = size;
	export let height = size;
	export let color = 'currentColor';
	export let path = '';

	let viewBox = `0 0 ${width} ${height}`;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	stroke={color}
	fill={color}
	stroke-width="1px"
>
	<path d={path} />
</svg>
