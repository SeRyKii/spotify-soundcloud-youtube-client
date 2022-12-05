<div class="w-full flex flex-col items-center">
	<div class="sm:w-1/2 w-64 flex flex-col gap-4 dark:bg-surface-800 p-5 overflow-hidden">
		<!-- Make inputs for creating playlist, it needs to have fields for name and if it public -->
		<!-- Make a button to create the playlist -->

		<label for="name">
			<span>Name</span>
			<input type="text" name="name" id="name" placeholder="Name" />
		</label>
		<label for="public">
			<span class="mb-0">Public</span>
			<input type="checkbox" name="public" id="public" />
		</label>
		<button class="btn btn-filled-primary">Create</button>
	</div>
</div>
