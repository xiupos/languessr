<script lang="ts">
  export let langCode: string;

  let unique = {};

  const fetchSummary = async (langCode: string) => {
    const res = await fetch(
      `https://${langCode}.wikipedia.org/api/rest_v1/page/random/summary`
    );
    return await res.json();
  };

  // reload articles
  const reload = () => {
    unique = {};
  };

  // press R to reload articles
  document.addEventListener("keydown", (e) => {
    if (e.key === "r") reload();
  });
</script>

{#key unique}
  {#await fetchSummary(langCode)}
    <article
      aria-busy="true"
      style="margin-bottom: var(--block-spacing-vertical);"
    />
  {:then data}
    <article class="frame" dir="auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <h2 on:click={reload} class="ling">
        {data.title}
        <small class="secondary">
          <i class="fa fa-refresh" aria-hidden="true" role="link" />
        </small>
      </h2>
      <p class="ling">{data.extract || ""}</p>
      <footer dir="ltr">
        <small>
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
            >CC BY-SA 4.0</a
          >
          from
          <a href="https://en.wikipedia.org/api/rest_v1/" target="_blank"
            >Wikipedia</a
          >
        </small>
      </footer>
    </article>
    <p>
      Click <i class="fa fa-refresh" aria-hidden="true" /> or press
      <code>R</code> for another article in the same language.
    </p>
  {:catch error}
    <article aria-busy="true" />
    {(() => {
      console.log(error);
      setTimeout(reload, 1000);
      return "";
    })()}
  {/await}
{/key}

<style lang="scss">
  article {
    margin: 0;
    margin-bottom: var(--spacing);
    user-select: none;

    h2 small i {
      cursor: pointer;
      color: var(--secondary);

      &:hover {
        color: var(--secondary-hover);
        text-decoration: none;
      }
    }

    footer small {
      color: var(--secondary);

      a {
        color: var(--secondary);

        &:hover {
          color: var(--secondary-hover);
        }
      }
    }

    & + p {
      color: var(--secondary);
      margin-bottom: var(--block-spacing-vertical);
    }
  }
</style>
