<script>
  import { format } from "../scripts/format.js";

  /**
   * Answer language
   * @type {import("../types.d.ts").LanguageCode[]}
   */
  export let codeList;

  /**
   * User-selected languge
   * @type {import("../types.d.ts").LanguageCode}
   */
  export let selectedLang;

  /**
   * Flag to display all language names in English
   * @type {boolean}
   */
  export let inEnglish;

  /**
   * Current game turn number
   * @type {number}
   */
  export let turn;

  /**
   * Total game turn number
   * @type {number}
   */
  export let turns;

  /**
   * Function of the guess button
   * @type {() => void}
   */
  export let guess;

  /**
   * Function for the next button
   * @type {number | undefined}
   */
  export let time = undefined;
</script>

<form>
  <label>
    Select your guess <i style="color: var(--secondary)"
      >from {codeList.length} language{#if codeList.length > 1}s{/if}</i
    >
    <select bind:value={selectedLang}>
      {#each codeList as lang}
        <option value={lang} class="lang">
          {lang.code} : {inEnglish ? lang.name.english : lang.name.local}
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
      Display names in English
    </label>
  </fieldset>

  <input type="button" value="GUESS {turn + 1}/{turns}" on:click={guess} />

  {#if time}
    Time: <tt>{format(time)}</tt>
  {/if}
</form>
