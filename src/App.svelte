<script lang="ts">
  import LangGuessr from "./lib/LangGuessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import easyCodeList from "./data/easy.json";
  import normalCodeList from "./data/code.json";

  type CodeList = {
    code: string;
    name: { local: string; english: string };
  }[];

  type ModeList = {
    name: string;
    codeList: CodeList;
  }[];

  const modeList: ModeList = [
    { name: "Easy", codeList: easyCodeList },
    { name: "Normal", codeList: normalCodeList },
  ];

  // mode
  let mode: ModeList[0] = localStorage.mode0 || modeList[0];

  // turns
  let turns: number = Number(localStorage.turns) || 5;

  // language list
  let codeList: CodeList;
  $: codeList = mode.codeList;
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
        </label>
      {/each}
    </fieldset>

    <fieldset>
      <legend>Max number of turns </legend>
      <label>
        <input
          type="radio"
          bind:group={turns}
          name="turns"
          value={5}
          on:change={() => {
            localStorage.turns = turns.toString();
          }}
        />
        5
      </label>
      <label>
        <input
          type="radio"
          bind:group={turns}
          name="turns"
          value={30}
          on:change={() => {
            localStorage.turns = turns.toString();
          }}
        />
        30
      </label>
    </fieldset>
  </details>
</section>
