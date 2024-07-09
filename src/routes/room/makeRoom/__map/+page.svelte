<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js'; // Adjust the path as per the package structure

	let password = '';
	let destination = '';
	let map;
	let mapContainer;
	let searchBox;
	let geocoder;

	function initializeMap(lat = 37.7749, lng = -122.4194) {
		// Default to San Francisco
		mapboxgl.accessToken =
			'pk.eyJ1IjoiamFkZGFrMjgiLCJhIjoiY2t3cnE0NDcyMHo1NjJ3cDN4eDU5cjkzMSJ9.ArgLo3tWR5WUDLRc1aPjJA';
		map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: 12
		});

		geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			placeholder: 'Search for a location'
		});

		searchBox.appendChild(geocoder.onAdd(map));

		// Listen for the 'result' event when a user selects a suggestion
		geocoder.on('result', (e) => {
			const { center } = e.result.geometry;
			map.setCenter(center);
		});
	}

	onMount(() => {
		if (typeof window !== 'undefined' && window.navigator) {
			// Request user's location
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						if (mapContainer) {
							initializeMap(latitude, longitude);
						}
					},
					() => {
						if (mapContainer) {
							initializeMap();
						}
					}
				);
			} else {
				if (mapContainer) {
					initializeMap();
				}
			}
		}
	});

	async function submitRoom() {
		if (password.length === 0 || destination.length === 0) {
			return;
		}
		// Handle room submission logic here
	}
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet" />
	<link
		href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
		rel="stylesheet"
	/>
</svelte:head>

<body>
	<div class="section">
		<div id="search-box" bind:this={searchBox} />
		<div id="map" bind:this={mapContainer} style="width: 400px; height: 400px;" />
	</div>
</body>


<style>
	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
	}
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		width: 100vw;
		height: 100vh;
		background-color: #212121;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: white;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Jakarta;
		font-weight: 300;
	}

	.inputHolder {
		width: 300px;
		height: 55px;
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
	}

	.userInput {
		width: 92.5%;
		font-size: 28px !important;
		font-weight: 600;
		min-height: 35px;
		margin-left: 10px;
		margin-top: 8px;
		background: #212121;
		color: white;
		text-align: left;
	}

	.inputHolder .userInput:focus {
		border-color: blue;
		border-width: medium medium 2px;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	input {
		font-size: 17px !important;
	}

	h1 {
		font-size: 40px;
		font-weight: 700;
	}

	.section {
		width: 100vw;
		height: auto;
		padding-top: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.button {
		width: 200px;
		height: 60px;
		border-radius: 10px;
		background: #141414;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		cursor: pointer;
		transition: linear 0.5s;
		margin-top: 30px;
	}

	.button:hover {
		background: #343434;
	}

	.button > span {
		font-size: 25px;
		font-weight: 600;
	}

	#enter {
		margin-top: 20px;
	}

	#map {
		margin: 20px auto;
		width: 80%;
		height: 500px;
	}
</style>
