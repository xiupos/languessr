<script lang="ts">
  import { tweened } from "svelte/motion";
  import Frame from "./Frame.svelte";
  import Form from "./Form.svelte";
  import GuessDialog from "./GuessDialog.svelte";
  import ResultDialog from "./ResultDialog.svelte";

  // language list
  export let codeList: {
    code: string;
    name: { local: string; english: string };
  }[];

  // mode name
  export let mode: string | undefined = undefined;

  // get a random language code
  const getRandomLang = () =>
    codeList[Math.floor(Math.random() * codeList.length)];

  // answer language code
  let trueLang = getRandomLang();

  // user-selected languge code
  let selectedLang: { code: string; name: { local: string; english: string } };

  // time
  let timer = tweened({ start: new Date(), stop: new Date() });

  // start timer
  let startTimer = () => {
    $timer.start = new Date();
  };

  // stop timer
  let stopTimer = () => {
    $timer.stop = new Date();
    return $timer.stop.getTime() - $timer.start.getTime();
  };

  // approximate time to display
  let approxTime = tweened(0);
  setInterval(() => {
    if (turn < turns)
      $approxTime = new Date().getTime() - $timer.start.getTime();
  }, 10);

  // get result time
  let resultTime = 0;

  // in English mode
  let inEnglish: boolean = localStorage.inEnglish === "true";

  // guess-dialog element
  let guessDialog: boolean = false;

  // result dialog element
  let resultDialog: boolean = false;

  // turn of game
  let turn: number = 0;
  export let turns: number = 5;

  // score of game
  let score: number = 0;

  // guess button
  const guess = () => {
    if (trueLang.code === selectedLang.code) score++;
    guessDialog = true;
  };

  // next button
  const next = () => {
    guessDialog = false;
    turn++;
    if (turn < turns) {
      trueLang = getRandomLang();
    } else {
      resultTime = stopTimer();
      resultDialog = true;
    }
  };

  // restart button
  const restart = () => {
    turn = 0;
    score = 0;
    resultDialog = false;
    trueLang = getRandomLang();
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
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+Arabic&family=Noto+Sans+Armenian&family=Noto+Sans+Bengali&family=Noto+Sans+Canadian+Aboriginal&family=Noto+Sans+Cherokee&family=Noto+Sans+Devanagari&family=Noto+Sans+Ethiopic&family=Noto+Sans+Georgian&family=Noto+Sans+Gothic&family=Noto+Sans+Gujarati&family=Noto+Sans+Hebrew&family=Noto+Sans+Kannada&family=Noto+Sans+Khmer&family=Noto+Sans+Lao+Looped&family=Noto+Sans+Malayalam&family=Noto+Sans+Multani&family=Noto+Sans+Myanmar&family=Noto+Sans+NKo&family=Noto+Sans+Newa&family=Noto+Sans+Ol+Chiki&family=Noto+Sans+Oriya&family=Noto+Sans+SC&family=Noto+Sans+Sinhala&family=Noto+Sans+Syriac&family=Noto+Sans+Syriac+Eastern&family=Noto+Sans+Tamil&family=Noto+Sans+Tamil+Supplement&family=Noto+Sans+Telugu&family=Noto+Sans+Thaana&family=Noto+Sans+Thai+Looped&family=Noto+Serif+Tibetan&display=swap');

  :global(.ling) {
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
