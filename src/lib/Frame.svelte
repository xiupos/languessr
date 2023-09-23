<script lang="ts">
  export let langCode: string;

  let unique = {};

  const fetchSummary = (async (langCode: string) => {
    const res = await fetch(`https://${langCode}.wikipedia.org/api/rest_v1/page/random/summary`);
    return await res.json();
  });

  const reload = () => {
    unique = {}
  };
</script>

{#key unique}
  {#await fetchSummary(langCode)}
    <article aria-busy="true"></article>
  {:then data}
    <article class="frame" dir="auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <h2 on:click={reload}>
        {data.title}
        <small class="secondary">
          <i class="fa fa-refresh" aria-hidden="true" />
        </small>
      </h2>
      <p>{data.extract}</p>
      <footer dir="ltr">
        <p class="secondary">
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY-SA 4.0</a>
          from <a href="https://en.wikipedia.org/api/rest_v1/" target="_blank">Wikipedia</a>
        </p>
      </footer>
    </article>
  {:catch error}
    <article aria-busy="true"></article>
    { (() => { console.log(error); setTimeout(reload, 1000); return '' })() }
  {/await}
{/key}

<style lang="scss">
  article {
    margin-top: 0;
    user-select: none;

    h2 i {
      cursor: pointer;
    }

    .secondary {
      color: var(--secondary);

      a {
        color: var(--secondary);
        text-decoration: underline;

        &:hover {
          color: var(--secondary-hover);
        }
      }
    }
  }
</style>
