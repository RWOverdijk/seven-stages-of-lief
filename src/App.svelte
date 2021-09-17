<script lang="ts">
  import { onMount } from "svelte";
  import { MidiParser } from "./lib/parser";
  import { NoteInfo, Piano } from "./lib/piano";

  let audioElement = null;
  let playing = false;
  let notes: (NoteInfo & { down: boolean })[] = [];
  let canPlay = false;
  let piano;

  onMount(async () => {
    audioElement.oncanplay = () => {
      canPlay = true;
    };

    audioElement.onplay = () => {
      piano.play((e) => {
        notes = notes.map((info) => {
          if (info.note === e.note) {
            return { ...info, down: e.position === Piano.PositionDown };
          }

          return info;
        });
      });

      playing = true;
    };

    let response = await fetch("/cute-tempo.mid");
    if (!response.ok)
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    let data = await response.arrayBuffer();

    const midi = MidiParser.parse(new Uint8Array(data));
    piano = new Piano(midi);
    const newNotes = {};

    // 37 - 90
    const startNote = 24;
    const endNote = 96;

    for (let i = startNote; i <= endNote; i++) {
      newNotes[i] = { ...piano.noteInfo(i), down: false };
    }

    notes = Object.values(newNotes);

    // 12 - 96
    // console.log(piano.noteInfo(96));

    // console.log(notes);
  });

  function startPlaying() {
    audioElement.play();
  }
</script>

<main>
  <audio src="song.mp3" bind:this={audioElement}>
    Error: your web browser does not support this audio player.
  </audio>
  {#if playing}
    <p>Seven stages of lief</p>
    <div id="content">
      <div id="notes">
        {#each notes as note}
          <div
            class="note{note.down ? ' down' : ''}{note.isSharp
              ? ' sharp-parent'
              : ''}"
          >
            {#if note.isSharp}
              <div class="sharp" />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <button on:click|once={startPlaying}>Play</button>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #content {
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 50vw;
  }

  p {
    font-family: "Indie Flower", cursive;
    color: #fbf9fe;
    font-size: x-large;
  }

  #notes {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    margin: 0 auto;
  }

  .note {
    border-left: 1px solid black;
    font-size: 10px;
    flex: 1;
    height: 69px;
    position: relative;
    transition: background-color 1s;
    background-color: #fbf9fe;
  }

  .note.sharp-parent {
    width: 0;
    background-color: blue;
    flex: 0;
    overflow: visible;
    border: none;
  }

  .sharp {
    position: absolute;
    z-index: 3;
    flex: 0;
    width: 0.5vw;
    margin-left: -0.25vw;
    height: 60%;
    border: none;
    background-color: #34373a;
    transition: background-color 1s;
  }

  .down .sharp,
  .down.note {
    background-color: #ff6a3d;
    transition: background-color 0ms;
  }

  button {
    font-family: "Indie Flower", cursive;
    background: none;
    border: none;
    color: #fbf9fe;
    font-size: xx-large;
    cursor: pointer;
  }

  button:hover {
    color: #ff6a3d;
  }

  @media (max-width: 960px) {
    #content {
      align-items: center;
      justify-content: center;
      flex-direction: row;
      width: 95vw;
    }

    .sharp {
      width: 1vw;
      margin-left: -0.5vw;
    }
  }
</style>
