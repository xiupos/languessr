<script>
  /**
   * Answer language
   * @type {string}
   */
  export let langCode;

  /** @type {{}} */
  let unique = {};

  /**
   * Function to fetch random summary from Wikipedia API
   * @param {string} langCode
   * @returns {Promise<any>}
   */
  const fetchSummary = async (langCode) => {
    let article;
    do {
      const API_ENDPOINT = `https://${langCode}.wikipedia.org/w/api.php`;

      const params = new URLSearchParams({
        action: "query",
        format: "json",
        origin: "*", // Required for CORS requests

        // Use the generator to get one random page
        generator: "random",
        grnnamespace: "0", // Limit to the "main" article namespace
        grnlimit: "1", // Get only one page

        // Specify the properties to retrieve from the generated page
        prop: "extracts|info",
        exsentences: "4", // Limit the extract with the number of sentences
        exintro: "true", // Limit the extract to the introduction section
        explaintext: "true", // Get the extract as plain text, without HTML tags
      });

      // Fetch a random article via MediaWiki API
      article = Object.values(
        (await (await fetch(`${API_ENDPOINT}?${params}`)).json()).query.pages
      )[0];

      // if the title is empty, redo fetch
    } while (!article.title);
    return { title: article.title, extract: article.extract };
  };

  /**
   * Function to reload articles
   * @type {() => void}
   */
  const reload = () => {
    unique = {};
  };

  // Press `R` to reload articles
  document.addEventListener("keydown", (e) => {
    if (e.key === "r" && !e.repeat) reload();
  });
</script>

{#key unique}
  {#await fetchSummary(langCode)}
    <!-- Loading screen -->
    <article
      aria-busy="true"
      style="margin-bottom: var(--block-spacing-vertical);"
    />
  {:then data}
    <!-- Display the summary -->
    <article class="frame" dir="auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <h2 on:click={reload} class="lang">
        {data.title}
        <small class="secondary">
          <!-- reflesh button (dummy) -->
          <i class="fa fa-refresh" aria-hidden="true" role="link" />
        </small>
      </h2>
      {#if data.extract}
        <p class="lang">{data.extract}</p>
      {/if}
      <footer dir="ltr">
        <!-- Credit of the summary -->
        <small>
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
            >CC BY-SA 4.0</a
          >
          from
          <a href="https://en.wikipedia.org/w/api.php" target="_blank"
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
    <article
      aria-busy="true"
      style="margin-bottom: var(--block-spacing-vertical);"
    />
    {(() => {
      // Print the error log to the console
      console.log(error);
      // Reload after 1000 ms
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
