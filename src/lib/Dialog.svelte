<script>
  /** @type {HTMLDialogElement} */
  let dialog;

  /** @type {boolean} */
  export let open;

  $: if (dialog) dialog.open = open;
</script>

<dialog bind:this={dialog}>
  {#if dialog?.open}
    <article>
      <slot />
    </article>
  {/if}
</dialog>
