<script lang="ts">
  let dialog: HTMLDialogElement;
  export let open: boolean;

  $: if (dialog) dialog.open = open;
</script>

<dialog bind:this={dialog}>
  {#if dialog?.open}
    <article>
      <slot />
    </article>
  {/if}
</dialog>
