<script>
  import Languessr from "./lib/Languessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import beginnerCodeList from "./data/beginner.json";
  import easyCodeList from "./data/easy.json";
  import easyArabicCodeList from "./data/easy_arabic.json";
  import easyBaltoSlavicCodeList from "./data/easy_balto-slavic.json";
  import easyGermanicCodeList from "./data/easy_germanic.json";
  import easyRomanceCodeList from "./data/easy_romance.json";
  import easyTurkicCodeList from "./data/easy_turkic.json";
  import easySouthAsianCodeList from "./data/easy_south_asian.json";
  import normalCodeList from "./data/normal.json";

  /**
   * list of mode
   * @type {{ [key: string]: { display: string, codeList: import("./types.d.ts").LanguageCode[] } }}
   */
  const modes = {
    beginner: { display: "Beginner", codeList: beginnerCodeList },
    easy: { display: "Easy", codeList: easyCodeList },
    easy_ara: {
      display: "Easy (Arabic script only)",
      codeList: easyArabicCodeList,
    },
    easy_bs: {
      display: "Easy (Balto-Slavic only)",
      codeList: easyBaltoSlavicCodeList,
    },
    easy_g: {
      display: "Easy (Germanic only)",
      codeList: easyGermanicCodeList,
    },
    easy_r: {
      display: "Easy (Romance only)",
      codeList: easyRomanceCodeList,
    },
    easy_t: {
      display: "Easy (Turkic only)",
      codeList: easyTurkicCodeList,
    },
    easy_sa: {
      display: "Easy (South Asian only)",
      codeList: easySouthAsianCodeList,
    },
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

  /**
   * Flag to use the native select input
   * @type {boolean}
   */
  let nativeSelect = localStorage.nativeSelect === "true" || false;

  /**
   * Flag for dark mode
   * @type {boolean}
   */
  let darkMode =
    localStorage.darkMode === "true" ? true :
    localStorage.darkMode === "false" ? false :
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    false;
  $: document.querySelector("html")?.setAttribute("data-theme", darkMode ? "dark" : "light");

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
    {#key nativeSelect}
      <Languessr
        codeList={modes[mode].codeList}
        mode={modes[mode].display}
        {nativeSelect}
        {turns}
      />
    {/key}
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
      <legend>Max number of turns</legend>
      {#each turnsList as t}
        <input
          type="radio"
          bind:group={turns}
          name="turns"
          id={String(t)}
          value={t}
          on:change={() => {
            localStorage.turns = t.toString();
          }}
        />
        <label for={String(t)} style="margin-right: 1.5em">{t}</label>
      {/each}
    </fieldset>

    <fieldset>
      <legend>Other</legend>
      <label>
        <input
          type="checkbox"
          bind:checked={nativeSelect}
          name="nativeSelect"
          role="switch"
          on:change={() => {
            localStorage.nativeSelect = nativeSelect;
          }}
        />
        Use the native select box
      </label>
      <label>
        <input
          type="checkbox"
          bind:checked={darkMode}
          name="darkMode"
          role="switch"
          on:change={() => {
            localStorage.darkMode = darkMode;
          }}
        />
        Dark mode
      </label>
    </fieldset>
  </details>
</section>
