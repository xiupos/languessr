<script>
  import { tweened } from "svelte/motion";
  import Frame from "./Frame.svelte";
  import Form from "./Form.svelte";
  import GuessDialog from "./GuessDialog.svelte";
  import ResultDialog from "./ResultDialog.svelte";

  /**
   * List of languages
   * @type {import("../types.d.ts").LanguageCode[]}
   */
  export let codeList;

  /**
   * Mode name such as `easy` or `normal`
   * @type {string | undefined}
   */
  export let mode = undefined;

  /**
   * Function to get a random language code
   * @return {import("../types.d.ts").LanguageCode}
   */
  const getRandomLang = () =>
    codeList[Math.floor(Math.random() * codeList.length)];

  /**
   * Answer language
   * @type {import("../types.d.ts").LanguageCode}
   */
  let trueLang = getRandomLang();

  /**
   * User-selected languge
   * @type {import("../types.d.ts").LanguageCode}
   */
  let selectedLang;

  /**
   * Timer
   * @type {import("svelte/motion").Tweened<{ start: Date; stop: Date; }>}
   */
  let timer = tweened({ start: new Date(), stop: new Date() });

  /**
   * Function to start the timer
   * @type {() => void}
   */
  let startTimer = () => {
    $timer.start = new Date();
  };

  /**
   * Function to stop the timer
   * @return {number}
   */
  let stopTimer = () => {
    $timer.stop = new Date();
    return $timer.stop.getTime() - $timer.start.getTime();
  };

  /**
   * Approximate time to be displayed always
   * @type {import("svelte/motion").Tweened<number>}
   */
  let approxTime = tweened(0);
  // update every 10 ms
  setInterval(() => {
    if (turn < turns)
      $approxTime = new Date().getTime() - $timer.start.getTime();
  }, 10);

  /**
   * Result time taken for all turns
   * @type {number}
   */
  let resultTime = 0;

  /**
   * Flag to display all language names in English
   * @type {boolean}
   */
  let inEnglish = localStorage.inEnglish === "true";

  /**
   * Flag that the guess-dialog element is opened
   * @type {boolean}
   */
  let guessDialog = false;

  /**
   * Flag that the result dialog element is opened
   * @type {boolean}
   */
  let resultDialog = false;

  /**
   * Current game turn number
   * @type {number}
   */
  let turn = 0;

  /**
   * Total game turn number
   * @type {number}
   */
  export let turns = 5;

  /**
   * Flag to use the native select input
   * @type {boolean}
   */
  export let nativeSelect = false;

  /**
   * Score of game
   * @type {number}
   */
  let score = 0;

  /**
   * Function of the guess button
   * @type {() => void}
   */
  const guess = () => {
    // if no languages has selected, do nothing
    if(!selectedLang) return;

    // if the guess is correct and no dialogs has opened, increment the score
    if (trueLang.code === selectedLang.code && !guessDialog && !resultDialog)
      score++;
    // open a guess-dialog
    guessDialog = true;
  };

  /**
   * Function for the next button
   * @type {() => void}
   */
  const next = () => {
    // close the guess-dialog
    guessDialog = false;
    // increment the turn number
    turn++;

    if (turn < turns) {
      // if turns has not completed,
      // make the answer another language
      while (trueLang == (trueLang = getRandomLang()));
    } else {
      // if turns has completed (<=> the game ended)
      // stop the timer
      resultTime = stopTimer();
      // open a result dialog
      resultDialog = true;
    }
  };

  /**
   * Function for the restart button
   * @type {() => void}
   */
  const restart = () => {
    // reset numberes
    turn = 0;
    score = 0;
    // close the result dialog
    resultDialog = false;
    // make the answer another language
    while (trueLang == (trueLang = getRandomLang()));
    // restart the timer
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
    {nativeSelect}
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
    font-family:
      system-ui,
      -apple-system,
      "Noto Sans",
      "Noto Sans Arabic",
      "Noto Sans Armenian",
      "Noto Sans Bengali",
      "Noto Sans Canadian Aboriginal",
      "Noto Sans Cherokee",
      "Noto Sans Devanagari",
      "Noto Sans Ethiopic",
      "Noto Sans Georgian",
      "Noto Sans Gothic",
      "Noto Sans Gujarati",
      "Noto Sans Hebrew",
      "Noto Sans Kannada",
      "Noto Sans Khmer",
      "Noto Sans Lao Looped",
      "Noto Sans Malayalam",
      "Noto Sans Myanmar",
      "Noto Sans Newa",
      "Noto Sans NKo",
      "Noto Sans Ol Chiki",
      "Noto Sans Oriya",
      "Noto Sans SC",
      "Noto Sans Sinhala",
      "Noto Sans Syriac",
      "Noto Sans Syriac Eastern",
      "Noto Sans Tamil",
      "Noto Sans Tamil Supplement",
      "Noto Sans Telugu",
      "Noto Sans Thaana",
      "Noto Sans Thai Looped",
      "Noto Serif Tibetan";
  }
</style>
