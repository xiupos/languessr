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
  export let turns: number;
  export let guess: () => void;
  export let time: number | undefined = undefined;
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
