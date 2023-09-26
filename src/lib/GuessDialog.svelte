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

  let trueLangName: string;
  let selectedLangName: string;

  let trueLangURL: string;
  let selectedLangURL: string;

  $: trueLangName = inEnglish
    ? `${trueLang.name.english} (${trueLang.code})`
    : `${trueLang.name.local} (${trueLang.code})`;
  $: selectedLangName =
    (selectedLang?.name !== undefined || "") &&
    (inEnglish
      ? `${selectedLang.name.english} (${selectedLang.code})`
      : `${selectedLang.name.local} (${selectedLang.code})`);

  $: trueLangURL = inEnglish
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(
        trueLang.name.english
      )}`
    : `https://${trueLang.code}.wikipedia.org/wiki/${encodeURIComponent(
        trueLang.name.local.split("/")[0].trim()
      )}`;
  $: selectedLangURL =
    (selectedLang?.name !== undefined || "") &&
    (inEnglish
      ? `https://en.wikipedia.org/wiki/${encodeURIComponent(
          selectedLang.name.english
        )}`
      : `https://${selectedLang.code}.wikipedia.org/wiki/${encodeURIComponent(
          selectedLang.name.local.split("/")[0].trim()
        )}`);
</script>

<Dialog {open}>
  {#if trueLang.code === selectedLang.code}
    <h3>Nice🎉</h3>
    <p>
      The right answer was indeed
      <a href={trueLangURL} target="_blank" class="lang">{trueLangName}</a>.
    </p>
  {:else}
    <h3>Oops!</h3>
    <p>
      You guessed
      <a href={selectedLangURL} target="_blank" class="lang">{selectedLangName}</a>
      but the right answer was
      <a href={trueLangURL} target="_blank" class="lang">{trueLangName}</a>.
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
