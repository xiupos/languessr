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
  let selectedLang: { code: string, name: { local: string, english: string } };

  // English
  let enChecked: boolean;

  const guess = () => () => {
    if (trueLang.code === selectedLang.code) {
      alert(`Nice🎉 The right answer was indeed ${enChecked ? trueLang.name.english : trueLang.name.local} (${trueLang.code}).`);
    } else {
      alert(`You guessed ${enChecked ? selectedLang.name.english : selectedLang.name.local} (${selectedLang.code}) but the right answer was ${enChecked ? trueLang.name.english : trueLang.name.local} (${trueLang.code}).`);
    }
    trueLang = getRandomLang();
  }
</script>

<Frame bind:langCode={trueLang.code} />

<form>
  <label>
    Select your guess
    <select bind:value={selectedLang}>
      {#each codeList as lang}
        <option value={lang}>
          {enChecked ? lang.name.english : lang.name.local} ({lang.code})
        </option>
      {/each}
    </select>
  </label>

  <fieldset>
    <label>
      <input type="checkbox" role="switch" bind:checked={enChecked} />
      English Mode
    </label>
  </fieldset>

  <input type="button" value="GUESS" on:click={guess()}>
</form>

<style lang="scss">

</style>
