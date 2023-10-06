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
  type ModeList = {
    name: string;
    codeList: CodeList;
  }[];
  const modeList: ModeList = [
    { name: "Beginner", codeList: beginnerCodeList },
    { name: "Easy", codeList: easyCodeList },
    { name: "Normal", codeList: normalCodeList },
  ];
  let mode: ModeList[0] = localStorage.mode0 || modeList[0];

  // turns
  const turnsList: number[] = [5, 30];
  let turns: number = Number(localStorage.turns) || turnsList[0];
</script>

<p>
  You are playing in <mark>{mode.name}</mark> mode with <mark>{turns}</mark> turns!
</p>

{#key mode}
  {#key turns}
    <LangGuessr codeList={mode.codeList} mode={mode.name} {turns} />
  {/key}
{/key}

<section>
  <details>
    <summary>Settings</summary>

    <fieldset>
      <legend>Mode</legend>
      {#each modeList as m}
        <label>
          <input
            type="radio"
            bind:group={mode}
            name="mode"
            value={m}
            on:change={() => {
              localStorage.mode0 = m;
            }}
          />
          {m.name}
          <i style="color: var(--secondary)">— {m.codeList.length} languages</i>
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
