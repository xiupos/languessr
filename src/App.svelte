<script lang="ts">
  import Frame from "./lib/Frame.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import codeList from "./lib/code.json";

  // get a random language code
  const getRandomLang = () =>
    codeList[Math.floor(Math.random() * codeList.length)];

  // answer language code
  let trueLang = getRandomLang();

  // user-selected languge code
  let selectedLang: { code: string; name: { local: string; english: string } };

  // English mode
  let enChecked: boolean;

  // dialog element
  let dialog: HTMLDialogElement;

  // dialog next button
  const dialogNext = () => {
    dialog.open = false;
    trueLang = getRandomLang();
  };

  // guess button
  const guess = () => {
    dialog.open = true;
  };
</script>

<dialog bind:this={dialog}>
  {#if dialog?.open}
    <article>
      {#if selectedLang.code && trueLang.code === selectedLang.code}
        <h3>Nice🎉</h3>
        <p>
          The right answer was indeed
          <a href="https://{trueLang.code}.wikipedia.org/" target="_blank">
            {enChecked ? trueLang.name.english : trueLang.name.local}
            ({trueLang.code})
          </a>.
        </p>
      {:else}
        <h3>Oops..</h3>
        <p>
          You guessed
          <a href="https://{selectedLang.code}.wikipedia.org/" target="_blank">
            {enChecked ? selectedLang.name.english : selectedLang.name.local}
            ({selectedLang.code})
          </a>
          but the right answer was
          <a href="https://{trueLang.code}.wikipedia.org/" target="_blank">
            {enChecked ? trueLang.name.english : trueLang.name.local}
            ({trueLang.code})
          </a>.
        </p>
      {/if}
      <footer>
        <input type="button" value="Next" on:click={dialogNext} />
      </footer>
    </article>
  {/if}
</dialog>

<Frame bind:langCode={trueLang.code} />
<p class="secondary">
  Click <i class="fa fa-refresh" aria-hidden="true" /> for another article in the
  same language.
</p>

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

  <input type="button" value="GUESS" on:click={guess} />
</form>

<style lang="scss">
</style>
