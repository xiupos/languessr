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
    if (turn < maxTurn)
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
  let maxTurn: number = 5;

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
    if (turn < maxTurn) {
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

<!-- article frame -->
<Frame bind:langCode={trueLang.code} />

<!-- guess form -->
<Form
  {codeList}
  bind:selectedLang
  bind:inEnglish
  {turn}
  {maxTurn}
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
  maxScore={maxTurn}
  {next}
/>

<!-- result dialog -->
<ResultDialog
  open={resultDialog}
  {score}
  maxScore={maxTurn}
  {mode}
  time={resultTime}
  {restart}
/>
