<script>
  import { tweened } from "svelte/motion";
  import Frame from "./Frame.svelte";
  import Form from "./Form.svelte";
  import GuessDialog from "./GuessDialog.svelte";
  import ResultDialog from "./ResultDialog.svelte";

  /**
   * language list
   * @type {import("../types.d.ts").LanguageCode[]}
   */
  export let codeList;

  /**
   * mode name
   * @type {string | undefined}
   */
  export let mode = undefined;

  /**
   * get a random language code
   * @return {import("../types.d.ts").LanguageCode}
   */
  const getRandomLang = () =>
    codeList[Math.floor(Math.random() * codeList.length)];

  /**
   * answer language code
   * @type {import("../types.d.ts").LanguageCode}
   */
  let trueLang = getRandomLang();

  /**
   * user-selected languge code
   * @type {import("../types.d.ts").LanguageCode}
   */
  let selectedLang;

  /**
   * time
   * @type {import("svelte/motion").Tweened<{ start: Date; stop: Date; }>}
   */
  let timer = tweened({ start: new Date(), stop: new Date() });

  /**
   * start timer
   * @type {() => void}
   */
  let startTimer = () => {
    $timer.start = new Date();
  };

  /**
   * stop timer
   * @return {number}
   */
  let stopTimer = () => {
    $timer.stop = new Date();
    return $timer.stop.getTime() - $timer.start.getTime();
  };

  /**
   * approximate time to display
   * @type {import("svelte/motion").Tweened<number>}
   */
  let approxTime = tweened(0);
  setInterval(() => {
    if (turn < turns)
      $approxTime = new Date().getTime() - $timer.start.getTime();
  }, 10);

  /**
   * get result time
   * @type {number}
   */
  let resultTime = 0;

  /**
   * in English mode
   * @type {boolean}
   */
  let inEnglish = localStorage.inEnglish === "true";

  /**
   * guess-dialog element
   * @type {boolean}
   */
  let guessDialog = false;

  /**
   * result dialog element
   * @type {boolean}
   */
  let resultDialog = false;

  /**
   * turn of game
   * @type {number}
   */
  let turn = 0;

  /**
   * total turns of game
   * @type {number}
   */
  export let turns = 5;

  /**
   * score of game
   * @type {number}
   */
  let score = 0;

  /**
   * guess button
   * @type {() => void}
   */
  const guess = () => {
    if (!guessDialog && !resultDialog && trueLang.code === selectedLang.code) score++;
    guessDialog = true;
  };

  /**
   * next button
   * @type {() => void}
   */
  const next = () => {
    guessDialog = false;
    turn++;
    if (turn < turns) {
      while(trueLang == (trueLang = getRandomLang()));
    } else {
      resultTime = stopTimer();
      resultDialog = true;
    }
  };

  /**
   * next button
   * @type {() => void}
   */
  const restart = () => {
    turn = 0;
    score = 0;
    resultDialog = false;
    while(trueLang == (trueLang = getRandomLang()));
    startTimer();
  };
</script>

<section>
  <!-- article frame -->
  <Frame bind:langCode={trueLang.code} />

  <!-- guess form -->
  <Form
    {codeList}
    bind:selectedLang
    bind:inEnglish
    {turn}
    {turns}
    {guess}
    time={$approxTime}
  />

  <!-- guess dialog -->
  <GuessDialog
    open={guessDialog}
    {trueLang}
    {selectedLang}
    {inEnglish}
    {score}
    maxScore={turns}
    {next}
  />

  <!-- result dialog -->
  <ResultDialog
    open={resultDialog}
    {score}
    maxScore={turns}
    {mode}
    time={resultTime}
    {restart}
  />
</section>

<style lang="scss">
  @import "@fontsource/noto-sans";
  @import "@fontsource/noto-sans-arabic";
  @import "@fontsource/noto-sans-armenian";
  @import "@fontsource/noto-sans-bengali";
  @import "@fontsource/noto-sans-canadian-aboriginal";
  @import "@fontsource/noto-sans-cherokee";
  @import "@fontsource/noto-sans-devanagari";
  @import "@fontsource/noto-sans-ethiopic";
  @import "@fontsource/noto-sans-georgian";
  @import "@fontsource/noto-sans-gothic";
  @import "@fontsource/noto-sans-gujarati";
  @import "@fontsource/noto-sans-hebrew";
  @import "@fontsource/noto-sans-kannada";
  @import "@fontsource/noto-sans-khmer";
  @import "@fontsource/noto-sans-lao-looped";
  @import "@fontsource/noto-sans-malayalam";
  @import "@fontsource/noto-sans-myanmar";
  @import "@fontsource/noto-sans-newa";
  @import "@fontsource/noto-sans-nko";
  @import "@fontsource/noto-sans-ol-chiki";
  @import "@fontsource/noto-sans-oriya";
  @import "@fontsource/noto-sans-sc";
  @import "@fontsource/noto-sans-sinhala";
  @import "@fontsource/noto-sans-syriac";
  @import "@fontsource/noto-sans-syriac-eastern";
  @import "@fontsource/noto-sans-tamil";
  @import "@fontsource/noto-sans-tamil-supplement";
  @import "@fontsource/noto-sans-telugu";
  @import "@fontsource/noto-sans-thaana";
  @import "@fontsource/noto-sans-thai-looped";
  @import "@fontsource/noto-serif-tibetan";

  :global(.lang) {
    font-family: system-ui, -apple-system, "Noto Sans", "Noto Sans Arabic",
      "Noto Sans Armenian", "Noto Sans Bengali",
      "Noto Sans Canadian Aboriginal", "Noto Sans Cherokee",
      "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian",
      "Noto Sans Gothic", "Noto Sans Gujarati", "Noto Sans Hebrew",
      "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao Looped",
      "Noto Sans Malayalam", "Noto Sans Myanmar", "Noto Sans Newa",
      "Noto Sans NKo", "Noto Sans Ol Chiki", "Noto Sans Oriya", "Noto Sans SC",
      "Noto Sans Sinhala", "Noto Sans Syriac", "Noto Sans Syriac Eastern",
      "Noto Sans Tamil", "Noto Sans Tamil Supplement", "Noto Sans Telugu",
      "Noto Sans Thaana", "Noto Sans Thai Looped", "Noto Serif Tibetan";
  }
</style>
