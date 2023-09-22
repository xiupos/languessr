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

  // guess-dialog element
  let guessDialog: HTMLDialogElement;

  // result dialog element
  let resultDialog: HTMLDialogElement;

  // turn of game
  let turn: number = 0;
  const maxTurn: number = 5;

  // score of game
  let score: number = 0;

  // guess button
  const guess = () => {
    if (trueLang.code === selectedLang.code) score++;
    guessDialog.open = true;
  };

  // next button
  const next = () => {
    guessDialog.open = false;
    turn++;
    if (turn < maxTurn) {
      trueLang = getRandomLang();
    } else {
      resultDialog.open = true;
    }
  };

  // restart button
  const restart = () => {
    turn = 0;
    score = 0;
    resultDialog.open = false;
    trueLang = getRandomLang();
  };
</script>

<!-- guess dialog -->
<dialog bind:this={guessDialog}>
  {#if guessDialog?.open}
    <article>
      {#if trueLang.code === selectedLang.code}
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
        <label>
          Score
          <progress value={score} max={maxTurn} />
        </label>
        <input type="button" value="Next" on:click={next} />
      </footer>
    </article>
  {/if}
</dialog>

<!-- result dialog -->
<dialog bind:this={resultDialog}>
  {#if resultDialog?.open}
    <article>
      <h3>
        You guessed {score} / {maxTurn} correctly! {"🎉".repeat(score)}
      </h3>
      <label>
        Result
        <textarea style="resize: none;" readonly>#LangGuessr 📖 {score}/{maxTurn} {"🎉".repeat(score)}
{location.href}</textarea>
      </label>
      Copy-and-paste the result to share, or start a new game ↓
      <footer>
        <input type="button" value="Restart" on:click={restart} />
      </footer>
    </article>
  {/if}
</dialog>

<!-- article frame -->
<Frame bind:langCode={trueLang.code} />

<p class="secondary">
  Click <i class="fa fa-refresh" aria-hidden="true" /> for another article in the
  same language.
</p>

<!-- guess form -->
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

  <input type="button" value="GUESS {turn + 1}/{maxTurn}" on:click={guess} />
</form>

<style lang="scss">
  dialog article > footer {
    text-align: unset;
  }
</style>
