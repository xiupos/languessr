<script>
  import Select from "svelte-select";

  /** @type {any} */
  export let value;
  /** @type {{ value: any, label: string }[]} */
  export let items;

  /** @type {{ value: any, label: string } | null} */
  let valueBind = items.filter((item) => item.value === value)[0];
  $: value = valueBind?.value;
</script>

<Select
  {items}
  bind:value={valueBind}
  --height="calc(1rem * var(--line-height) + var(--form-element-spacing-vertical) * 2 + var(--border-width) * 2)"
  --margin="calc(var(--spacing) * .25) 0 var(--spacing)"
  --border="var(--border-width) solid var(--form-element-border-color)"
  --border-hover="var(--border-width) solid var(--form-element-border-color)"
  --border-focused="var(--border-width) solid var(--form-element-active-border-color)"
  --background="var(--form-element-background-color)"
  --list-background="var(--background-color)"
  --item-hover-bg="var(--dropdown-hover-background-color)"
  --item-color="var(--dropdown-color)"
  --item-is-active-bg="var(--primary)"
/>
