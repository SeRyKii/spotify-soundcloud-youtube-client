<script>
	import { currentService } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { faSpotify, faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { faMusic } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<RadioGroup selected={currentService}>
	<RadioItem value="local"><Fa icon={faMusic} size="1x" /></RadioItem>
	<RadioItem value="spotify"><Fa icon={faSpotify} size="1x" /></RadioItem>
	<RadioItem value="soundcloud"><Fa icon={faSoundcloud} size="1x" /></RadioItem>
	<RadioItem value="youtube"><Fa icon={faYoutube} size="1x" /></RadioItem>
</RadioGroup>
