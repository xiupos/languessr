<script lang="ts">
  import LangGuessr from "./lib/LangGuessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import beginnerCodeList from "./data/beginner.json";
  import easyCodeList from "./data/easy.json";
  import normalCodeList from "./data/code.json";

  // code list
  type CodeList = {
    code: string;
    name: { local: string; english: string };
  }[];

  // mode
  type ModeList = { [key: string]: CodeList };
  const modeList: ModeList = {
    "Beginner": beginnerCodeList,
    "Easy": easyCodeList,
    "Normal": normalCodeList,
  };
  let mode: string = localStorage.mode1 || Object.keys(modeList)[0];

  // turns
  const turnsList: number[] = [5, 30];
  let turns: number = Number(localStorage.turns) || turnsList[0];
</script>

<p>
  You are playing in <mark>{mode}</mark> mode with <mark>{turns}</mark> turns!
</p>

{#key mode}
  {#key turns}
    <LangGuessr codeList={modeList[mode]} {mode} {turns} />
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
