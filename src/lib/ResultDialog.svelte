<script>
  import { format } from "../scripts/format.js";
  import Dialog from "./Dialog.svelte";

  /** @type {boolean} */
  export let open;
  /** @type {number} */
  export let score;
  /** @type {number | undefined} */
  export let maxScore = undefined;
  /** @type {string | undefined} */
  export let mode = undefined;
  /** @type {number} */
  export let time;
  /** @type {() => void} */
  export let restart;
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
