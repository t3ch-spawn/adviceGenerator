<script>
  import Card from "./components/Card.svelte";
  import dice from "./assets/images/icon-dice.svg";

  let advice;
  let adviceId;
  let timer = 0;
  let timerFun;
  let mainTimer;

  function handleReload() {
    if (timerFun) {
      clearInterval(timerFun);
    }

    if (mainTimer) {
      clearInterval(mainTimer);
    }

    // try {
    //   const res = await fetch("https://api.adviceslip.com/advice");
    //   const data = await res.json();
    //   console.log(data)
    //   advice =  data.slip.advice
    //   adviceId =  data.slip.id
    // } catch (error) {
    //   console.log(error);
    // }
    timer = 10;

    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        if (!res.ok) {
          console.log("an error");
          return;
        }
        return res.json();
      })
      .then((data) => {
        advice = data.slip.advice;
        adviceId = data.slip.id;
      })
      .catch((error) => {
        console.log(error);
        advice = "...";
      });

    timerFun = setInterval(() => {
      if (advice !== '...' && advice !== undefined) timer--;
    }, 1000);

    mainTimer = setInterval(handleReload, 10000);

    console.log("has started");
  }

  handleReload();
</script>

<main class="bg-mainBg font-main">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <Card>
    <p class="absolute left-4 top-4 text-sm text-fontCol">
      Timer : 0:{`${timer}`.padStart(2, "0")}
    </p>

    <h1 class="text-cyan text-xs text-center tracking-[5px]">
      ADVICE {adviceId ? adviceId : "..."}
    </h1>

    <p class="text-fontCol font-extrabold text-2xl text-center">
      ❝{advice ? advice : "..."}❞
    </p>

    <div class="flex w-[100%] justify-center items-center gap-[8px]">
      <hr class="h-[1px] relative border-none bg-lineCol w-[100%]" />
      <div class="h-4 w-[13px] rounded-md bg-fontCol" />
      <div class="h-4 w-[13px] rounded-md bg-fontCol" />
      <hr class="h-[1px] relative border-none bg-lineCol w-[100%]" />
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={handleReload}
      class=" dice absolute w-14 h-14 bottom-[-25px] bg-cyan rounded-[50%] flex justify-center items-center cursor-pointer"
    >
      <img class=" w-[50%] pointer-events-none" src={dice} alt="" />
    </div>
  </Card>
</main>

<style>
  .dice:hover {
    box-shadow: 1px 1px 10px 3px hsl(150, 100%, 66%);
  }

  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
</style>
