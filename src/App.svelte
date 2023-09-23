<script lang="ts">
  import LangGuessr from "./lib/LangGuessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import codeList from "./data/code.json";
  import easyCodeList from "./data/easy.json";

  // easy mode
  let easyMode: boolean = true;
</script>

<fieldset>
  <label>
    <input type="checkbox" role="switch" bind:checked={easyMode} />
    Easy Mode (100 languages)
  </label>
</fieldset>

{#key easyMode}
  <LangGuessr codeList={easyMode ? easyCodeList : codeList} mode={easyMode ? 'Easy' : undefined} />
{/key}
