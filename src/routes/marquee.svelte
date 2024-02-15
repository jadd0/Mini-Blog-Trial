<script>
  export let content;
</script>

<div class="marquee">
  <ul class="marquee__content">
    <slot></slot>
  </ul>
</div>


<style>
  .marquee {
		--gap: 1rem;
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		overflow: hidden;
	}

	.marquee__content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
		min-width: 100%;
		font-size: 40px;
	}

	.marquee__content li {
		font-size: 250px;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) {
		.marquee__content {
			animation-play-state: paused !important;
		}
	}

	ul {
		list-style-type: none;
    color: white;
	}

	@keyframes scroll-abs {
		from {
			transform: translateX(calc(100% + var(--gap)));
		}
		to {
			transform: translateX(0);
		}
	}
</style>