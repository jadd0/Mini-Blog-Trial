<script>
  export let speed = 50;
</script>

<div class="marquee">
  <ul
    class="marquee__content"
    style="animation: scroll {speed}s linear infinite !important; color: rgb(82, 82, 82) !important"
  >
    <slot></slot>
  </ul>
  <ul
    aria-hidden="true"
    class="marquee__content"
    style="animation: scroll {speed}s linear infinite !important; color: rgb(82, 82, 82) !important"
  >
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
    margin: none;
	}

	.marquee__content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;

		min-width: 100%;
		/* color:rgb(82, 82, 82) !important; */
	}

	@keyframes -global-scroll {
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

	@keyframes -global-scroll-abs {
		from {
			transform: translateX(calc(100% + var(--gap)));
		}
		to {
			transform: translateX(0);
		}
	}

	.marquee__content:last-child {
		animation-name: scroll-abs;
	}

	ul {
		list-style-type: none;
		/* color: #333 !important; */
		font-size: 40px;
	}
</style>