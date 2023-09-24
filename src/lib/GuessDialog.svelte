<script lang="ts">
  import Dialog from "./Dialog.svelte";

  export let open: boolean;
  export let trueLang: {
    code: string;
    name: { local: string; english: string };
  };
  export let selectedLang: {
    code: string;
    name: { local: string; english: string };
  };
  export let inEnglish: boolean = false;
  export let score: number;
  export let maxScore: number;
  export let next: () => void;
</script>

<Dialog {open}>
  {#if trueLang.code === selectedLang.code}
    <h3>Nice🎉</h3>
    <p>
      The right answer was indeed
      {#if inEnglish}
        <a
          href="https://en.wikipedia.org/wiki/{encodeURIComponent(
            trueLang.name.english
          )}"
          target="_blank"
        >
          {trueLang.name.english} ({trueLang.code})</a
        >.
      {:else}
        <a
          href="https://{trueLang.code}.wikipedia.org/wiki/{encodeURIComponent(
            trueLang.name.local
          )}"
          target="_blank"
        >
          {trueLang.name.local} ({trueLang.code})</a
        >.
      {/if}
    </p>
  {:else}
    <h3>Oops!</h3>
    <p>
      You guessed
      {#if inEnglish}
        <a
          href="https://en.wikipedia.org/wiki/{encodeURIComponent(
            selectedLang.name.english
          )}"
          target="_blank"
        >
          {selectedLang.name.english} ({selectedLang.code})
        </a>
      {:else}
        <a
          href="https://{selectedLang.code}.wikipedia.org/wiki/{encodeURIComponent(
            selectedLang.name.local
          )}"
          target="_blank"
        >
          {selectedLang.name.local} ({selectedLang.code})
        </a>
      {/if}
      but the right answer was
      {#if inEnglish}
        <a
          href="https://en.wikipedia.org/wiki/{encodeURIComponent(
            trueLang.name.english
          )}"
          target="_blank"
        >
          {trueLang.name.english} ({trueLang.code})</a
        >.
      {:else}
        <a
          href="https://{trueLang.code}.wikipedia.org/wiki/{encodeURIComponent(
            trueLang.name.local
          )}"
          target="_blank"
        >
          {trueLang.name.local} ({trueLang.code})</a
        >.
      {/if}
    </p>
  {/if}
  <footer style="text-align: unset;">
    <label>
      Score
      <progress value={score} max={maxScore} />
    </label>
    <input type="button" value="Next" on:click={next} />
  </footer>
</Dialog>
