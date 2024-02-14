<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
</script>

<SvelteInertiaScroll>
	<body>
    <div class="section">
      <strong>Scroll down!</strong>
    </div>
    <div class="section">
      <strong>2</strong>
    </div>
    <div class="section">
      <strong>3</strong>
    </div>
    <div class="section">
      <strong>4</strong>
    </div>
    <div class="section">
      <strong>5</strong>
    </div>
  </body>
</SvelteInertiaScroll>

<style>


body {
  margin: 0; 
  padding: 0;
  width: 100%;
}

.section {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 4em;
  &:first-child {
    background-color: #ccc;
  }
  &:nth-child(2) {
    color: #efefef;
    background-color: #212121;
  }
  &:nth-child(3) {
    background-color: #888;
  }
  &:nth-child(4) {
    background-color: #f00;
  }
}
</style>
