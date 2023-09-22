<script lang="ts">
  import Frame from "./lib/Frame.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import codeList from "./lib/code.json";

  // get a random language code
  const getRandomLang = () => codeList[Math.floor(Math.random() * codeList.length)];

  // answer language code
  let trueLang = getRandomLang();

  // user-selected languge code
  let selectedLangCode: string;

  // English
  let enChecked: boolean;

  const guess = () => () => {
    if (trueLang.code === selectedLangCode) {
      alert(`Nice! The right answer was indeed ${enChecked ? trueLang.name.english : trueLang.name.local} (${trueLang.code}).`);
    } else {
      alert(`You guessed ${selectedLangCode} but the right answer was ${enChecked ? trueLang.name.english : trueLang.name.local} (${trueLang.code}).`);
    }
    trueLang = getRandomLang();
  }
</script>

<Frame bind:langCode={trueLang.code} />
<form>
  <fieldset>
    <label for="switch-1">
      <input type="checkbox" role="switch" bind:checked={enChecked} />
      English
    </label>
  </fieldset>

  <select bind:value={selectedLangCode}>
    {#each codeList as lang}
      <option value={lang.code}>
        {enChecked ? lang.name.english : lang.name.local} ({lang.code})
      </option>
    {/each}
  </select>

  <input type="button" value="GUESS" on:click={guess()}>
</form>

<style lang="scss">

</style>
