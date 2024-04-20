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

  /** @type {String} */
  $: resultText =
    `#Languessr 📖 ${mode} ${score}/${maxScore} in ${format(time)}${score ? " " + "🎉".repeat(score) : ""}` +
    "\n" +
    location.href;
</script>

<Dialog {open}>
  <h3>
    You guessed {score} / {maxScore} correctly! {"🎉".repeat(score)}
  </h3>
  <h4>
    {#if mode !== undefined}Mode: {mode},
    {/if}Time: <tt>{format(time)}</tt>
  </h4>
  <label>
    Result
    <textarea style="resize: none;" readonly>{resultText}</textarea>
  </label>
  Share on
  <a
    href={"https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(resultText)}
    target="_blank"
    class="outline">Twitter</a
  >,
  <a
    href={"https://mastodonshare.com/?text=" + encodeURIComponent(resultText)}
    target="_blank"
    class="outline">Mastodon</a
  >,
  <a
    href={"https://misskey-hub.net/share/?text=" +
      encodeURIComponent(resultText)}
    target="_blank"
    class="outline">Misskey</a
  >, or start a new game ↓
  <footer>
    <input type="button" value="Restart" on:click={restart} />
  </footer>
</Dialog>
