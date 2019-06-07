# ternary-plot

Web component to implement a ternary plot.

## Usage

In an html file

```
<html>
	<head>
		<script type="module">
			import 'ternary-plot/ternary-plot.umd.js';
		</script>
	</head>
	<body>
		<ternary-plot side="400"></ternary-plot>
	</body>
	<script>
		const element = document.querySelector('ternary-plot');
		// Set data as a dynamic property.
		element.data = {
			titles: {
				bottom: "Variable A",
				right: "Variable B",
				left: "Variable C",
			},
			data: [
				{
					bottom: 0.3,
					right: 0.4,
					left: 0.3
				},
				{
					bottom: 0.1,
					right: 0.5,
					left: 0.4
				},
			]
		};
	</script>
</html>
```

## License

MIT
