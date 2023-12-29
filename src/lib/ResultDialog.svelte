<script lang="ts">
  import { format } from "../scripts/format";
  import Dialog from "./Dialog.svelte";

  export let open: boolean;
  export let score: number;
  export let maxScore: number | undefined = undefined;
  export let mode: string | undefined = undefined;
  export let time: number;
  export let restart: () => void;
</script>

<Dialog {open}>
  <h3>
    You guessed {score} / {maxScore} correctly! {"🎉".repeat(score)}
  </h3>
  <h4>
    {#if mode !== undefined}Mode: {mode}, {/if}Time: <tt>{format(time)}</tt>
  </h4>
  <label>
    Result
    <textarea style="resize: none;" readonly
      >#Languessr 📖 {mode} {score}/{maxScore} in {format(
        time
      )}{score
        ? " " + "🎉".repeat(score)
        : ""}&#10;&#13;{location.href}</textarea
    >
  </label>
  Copy-and-paste the result to share, or start a new game ↓
  <footer>
    <input type="button" value="Restart" on:click={restart} />
  </footer>
</Dialog>
