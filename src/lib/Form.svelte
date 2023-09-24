<script lang="ts">
  import { format } from "../scripts/format";

  export let codeList: {
    code: string;
    name: { local: string; english: string };
  }[];
  export let selectedLang: {
    code: string;
    name: { local: string; english: string };
  };
  export let inEnglish: boolean;
  export let turn: number;
  export let maxTurn: number;
  export let guess: () => void;
  export let time: number;
</script>

<form>
  <label>
    Select your guess <i style="color: var(--secondary)"
      >from {codeList.length} language{#if codeList.length > 1}s{/if}</i
    >
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

  Time: <tt>{format(time)}</tt>
</form>
