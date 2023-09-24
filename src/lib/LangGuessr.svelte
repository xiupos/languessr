<script lang="ts">
  import { tweened } from "svelte/motion";
  import Frame from "./Frame.svelte";

  // language list
  export let codeList: {
    code: string;
    name: { local: string; english: string };
  }[];

  // mode name
  export let mode: string | undefined = undefined;

  // get a random language code
  const getRandomLang = () =>
    codeList[Math.floor(Math.random() * codeList.length)];

  // answer language code
  let trueLang = getRandomLang();

  // user-selected languge code
  let selectedLang: { code: string; name: { local: string; english: string } };

  // time
  let timer = tweened({ start: new Date(), stop: new Date() });

  // start timer
  let startTimer = () => {
    $timer.start = new Date();
  };

  // stop timer
  let stopTimer = () => {
    $timer.stop = new Date();
  };

  // approximate time to display
  let approxTime = tweened(0);
  setInterval(() => {
    if (turn < maxTurn)
      $approxTime = new Date().getTime() - $timer.start.getTime();
  }, 10);

  // format time
  let format = (time: number) => {
    const min = Math.floor(time / 1000 / 60).toString().padStart(2, '0');
    const sec = Math.floor(time / 1000 % 60).toString().padStart(2, '0');
    const msec = Math.floor(time % 1000).toString().padStart(3, '0');
    return `${min}:${sec}.${msec}`;
  };

  // get result time
  let getTime = () => $timer.stop.getTime() - $timer.start.getTime();

  // in English mode
  let inEnglish: boolean = localStorage.inEnglish === "true";

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
      stopTimer();
      resultDialog.open = true;
    }
  };

  // restart button
  const restart = () => {
    turn = 0;
    score = 0;
    resultDialog.open = false;
    trueLang = getRandomLang();
    startTimer();
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
            {inEnglish ? trueLang.name.english : trueLang.name.local}
            ({trueLang.code})
          </a>.
        </p>
      {:else}
        <h3>Oops..</h3>
        <p>
          You guessed
          <a href="https://{selectedLang.code}.wikipedia.org/" target="_blank">
            {inEnglish ? selectedLang.name.english : selectedLang.name.local}
            ({selectedLang.code})
          </a>
          but the right answer was
          <a href="https://{trueLang.code}.wikipedia.org/" target="_blank">
            {inEnglish ? trueLang.name.english : trueLang.name.local}
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
      <h4>
        {#if mode !== undefined}Mode: {mode}, {/if}Time: {format(getTime())}
      </h4>
      <label>
        Result
        <textarea style="resize: none;" readonly
          >#LangGuessr 📖 {mode ? "Easy " : ""}{score}/{maxTurn} in {format(getTime())}{score
            ? " " + "🎉".repeat(score)
            : ""}
{location.href}</textarea
        >
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
    Select your guess <em class="secondary">{codeList.length} languages</em>
    <select bind:value={selectedLang}>
      {#each codeList as lang}
        <option value={lang}>
          {inEnglish ? lang.name.english : lang.name.local} ({lang.code})
        </option>
      {/each}
    </select>
  </label>

  <fieldset>
    <label>
      <input
        type="checkbox"
        role="switch"
        bind:checked={inEnglish}
        on:change={() => {
          localStorage.inEnglish = inEnglish ? "true" : false;
        }}
      />
      In English
    </label>
  </fieldset>

  <input type="button" value="GUESS {turn + 1}/{maxTurn}" on:click={guess} />

  Time: {format($approxTime)}
</form>

<style lang="scss">
  dialog article > footer {
    text-align: unset;
  }

  form {
    margin-top: var(--block-spacing-vertical);
  }

  .secondary {
    color: var(--secondary);
  }
</style>
