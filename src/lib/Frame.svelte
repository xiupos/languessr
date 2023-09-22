<script lang="ts">
  export let langCode: string;

  const fetchSummary = (async (langCode: string) => {
    const res = await fetch(`https://${langCode}.wikipedia.org/api/rest_v1/page/random/summary`);
    return await res.json();
  });

  let unique = {};
</script>

{#key unique}
  {#await fetchSummary(langCode)}
    <article aria-busy="true"></article>
  {:then data}
    <article class="frame" dir="auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <h1 on:click={()=>{unique = {}}}>{data.title} <small><i class="fa fa-refresh" aria-hidden="true"></i></small></h1>
      <p>{data.extract}</p>
      <footer><a href="https://creativecommons.org/licenses/by/4.0/">CC BY-SA 4.0</a> from <a href="https://en.wikipedia.org/api/rest_v1/">Wikipedia</a></footer>
    </article>
  {/await}
{/key}

<style lang="scss">
  article {
    margin-top: 0;
    user-select: none;

    footer {
      color: var(--secondary);

      a {
        color: var(--secondary);
        text-decoration: underline;
      }
    }
  }
</style>
