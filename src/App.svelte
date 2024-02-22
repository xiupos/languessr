<script>
  import Languessr from "./lib/Languessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import beginnerCodeList from "./data/beginner.json";
  import easyCodeList from "./data/easy.json";
  import normalCodeList from "./data/normal.json";

  /**
   * list of mode
   * @type {{ [key: string]: { display: string, codeList: import("./types.d.ts").LanguageCode[] } }}
   */
  const modes = {
    beginner: { display: "Beginner", codeList: beginnerCodeList },
    easy: { display: "Easy", codeList: easyCodeList },
    normal: { display: "Normal", codeList: normalCodeList },
  };

  /** @type {string} */
  let mode =
    localStorage.mode in modes ? localStorage.mode : Object.keys(modes)[0];

  /**
   * list of numbers of turns
   * @type {number[]}
   */
  const turnsList = [5, 30];

  /** @type {number} */
  let turns = turnsList.includes(Number(localStorage.turns))
    ? Number(localStorage.turns)
    : turnsList[0];
</script>

<p>
  You are playing in <mark>{modes[mode].display}</mark> mode with
  <mark>{turns}</mark> turns!
</p>

{#key mode}
  {#key turns}
    <Languessr
      codeList={modes[mode].codeList}
      mode={modes[mode].display}
      {turns}
    />
  {/key}
{/key}

<section>
  <details>
    <summary>Settings</summary>

    <fieldset>
      <legend>Mode</legend>
      {#each Object.entries(modes) as [name, _mode]}
        <label>
          <input
            type="radio"
            bind:group={mode}
            name="mode"
            value={name}
            on:change={() => {
              localStorage.mode = name;
            }}
          />
          {_mode.display}
          <i style="color: var(--secondary)"
            >— {_mode.codeList.length} languages</i
          >
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
