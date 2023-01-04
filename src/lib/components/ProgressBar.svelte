<script>
	// @ts-nocheck

	let progress = 50; // Initial progress value
	let isDragging = false; // Flag to track whether the handle is being dragged

	// Function to update the progress value and the width of the filled portion of the progress bar
	function updateProgress(newProgress) {
		progress = newProgress;
		document.querySelector('.progress-bar__fill').style.width = `${progress}%`;
	}

	// Function to handle dragging of the handle
	function handleDrag(event) {
		isDragging = true;
		mousemove();
		// Calculate the new progress value based on the position of the handle
		const newProgress =
			((event.clientX - event.target.offsetParent.offsetLeft) /
				event.target.offsetParent.offsetWidth) *
			100;
		updateProgress(newProgress);
	}

	// Function to handle dropping of the handle
	function handleDrop(event) {
		isDragging = false;
		// Calculate the new progress value based on the position of the handle
		const newProgress =
			((event.clientX - event.target.offsetParent.offsetLeft) /
				event.target.offsetParent.offsetWidth) *
			100;
		updateProgress(newProgress);
	}

	function mousemove() {
		window.addEventListener('mousemove', (e) => {
			const newProgress = ((e.clientX - e.target.offsetLeft) / e.target.offsetWidth) * 100;
			updateProgress(newProgress);
		});
		window.addEventListener('mouseup', (e) => {
			const newProgress = ((e.clientX - e.target.offsetLeft) / e.target.offsetWidth) * 100;
			updateProgress(newProgress);
			window.onmousemove = null;
		});
	}
</script>

{isDragging}
<!-- The progress bar element -->
<div
	class="progress-bar"
	on:click={(event) => {
		// Update the progress value when the progress bar is clicked, unless the handle is being dragged
		if (!isDragging) {
			const newProgress =
				((event.clientX - event.target.offsetLeft) / event.target.offsetWidth) * 100;
			updateProgress(newProgress);
		}
	}}
>
	<!-- The filled portion of the progress bar -->
	<div class="progress-bar__fill" style={`width: ${progress}%`}>
		<!-- The handle at the end of the progress bar -->
		<div
			class="progress-bar__handle"
			draggable="true"
			on:drag={handleDrag}
			on:dragend={handleDrop}
			on:click={mousemove}
		/>
	</div>
</div>

<style>
	.progress-bar {
		/* Add your desired styles for the progress bar using Tailwind CSS classes */
		height: 10px;
		width: 100%;
		background-color: #ddd;
		border-radius: 2px;
		cursor: pointer;
		position: relative;
	}
	.progress-bar__fill {
		/* Add your desired styles for the filled portion of the progress bar using Tailwind CSS classes */
		height: 100%;
		background-color: #333;
		border-radius: 2px;
		pointer-events: none;
		position: relative;
	}
	.progress-bar__handle {
		/* Add your desired styles for the handle at the end of the progress bar using Tailwind CSS classes */
		width: 20px;
		height: 20px;
		background-color: #fff;
		border-radius: 50%;
		cursor: pointer;
		position: absolute;
		top: -6px;
		right: -10px;
	}
</style>
