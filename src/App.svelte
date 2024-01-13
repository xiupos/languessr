<script>
  import Languessr from "./lib/Languessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import beginnerCodeList from "./data/beginner.json";
  import easyCodeList from "./data/easy.json";
  import normalCodeList from "./data/normal.json";

  /**
   * mode list
   * @type {{ [key: string]: import("./types.d.ts").LanguageCode[] }}
   */
  const modeList = {
    "Beginner": beginnerCodeList,
    "Easy": easyCodeList,
    "Normal": normalCodeList,
  };

  /** @type {string} */
  let mode = localStorage.mode1 || Object.keys(modeList)[0];

  /**
   * list of numbers of turns
   * @type {number[]}
   */
  const turnsList = [5, 30];

  /** @type {number} */
  let turns = Number(localStorage.turns) || turnsList[0];
</script>

<p>
  You are playing in <mark>{mode}</mark> mode with <mark>{turns}</mark> turns!
</p>

{#key mode}
  {#key turns}
    <Languessr codeList={modeList[mode]} {mode} {turns} />
  {/key}
{/key}

<section>
  <details>
    <summary>Settings</summary>

    <fieldset>
      <legend>Mode</legend>
      {#each Object.entries(modeList) as [m, codeList]}
        <label>
          <input
            type="radio"
            bind:group={mode}
            name="mode"
            value={m}
            on:change={() => {
              localStorage.mode1 = m;
            }}
          />
          {m}
          <i style="color: var(--secondary)">— {codeList.length} languages</i>
        </label>
      {/each}
    </fieldset>

    <fieldset>
      <legend>Max number of turns </legend>
      {#each turnsList as t}
        <label>
          <input
            type="radio"
            bind:group={turns}
            name="turns"
            value={t}
            on:change={() => {
              localStorage.turns = t.toString();
            }}
          />
          {t}
        </label>
      {/each}
    </fieldset>
  </details>
</section>
