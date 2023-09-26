<script lang="ts">
  import LangGuessr from "./lib/LangGuessr.svelte";

  // language list of wikipedia
  // https://meta.wikimedia.org/wiki/List_of_Wikipedias
  import codeList from "./data/code.json";
  import easyCodeList from "./data/easy.json";

  // mode
  let mode: string = localStorage.mode || "Easy";

  // turns
  let turns: number = Number(localStorage.turns) || 5;
</script>

<p>You are playing in <mark>{mode}</mark> mode with <mark>{turns}</mark> turns!</p>

{#key mode}
  {#key turns}
    <LangGuessr
      codeList={mode === "Easy" ? easyCodeList : codeList}
      {mode}
      {turns}
    />
  {/key}
{/key}

<section>
  <details>
    <summary>Settings</summary>

    <fieldset>
      <legend>Mode</legend>
      <label>
        <input
          type="radio"
          bind:group={mode}
          name="mode"
          value="Easy"
          on:change={() => {
            localStorage.mode = mode;
          }}
        />
        Easy
      </label>
      <label>
        <input
          type="radio"
          bind:group={mode}
          name="mode"
          value="Normal"
          on:change={() => {
            localStorage.mode = mode;
          }}
        />
        Normal
      </label>
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
