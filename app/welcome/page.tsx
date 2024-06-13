"use client"
import { useEffect, useState } from "react";
import { getEngine } from "./runtimeModel";
import useBack from "../hooks/useBack";
import { WebGLEngine } from "@galacean/engine";
import { invoke } from "@tauri-apps/api/tauri";

let gloEngine: WebGLEngine;
const Welcome = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchEngine = async () => {
      let engine = await getEngine();
      gloEngine = engine;
      gloEngine.run();
    };

    fetchEngine();
    () => {
      return gloEngine.destroy();
    }
  }, []);
  const resize = () => {
    gloEngine.canvas.resizeByClientSize();
  }
  useEffect(() => {
    window.addEventListener('resize', resize);
    () => {
      window.removeEventListener('resize', resize);
    }
  }, [])

  const [goBack] = useBack();

  useEffect(() => {
    handlePlay();
    return () => {
      handlePause();
    }
  }, []);


  const handlePlay = async () => {
    const file_path = './assets/hhs.ogg';
    const event = { action: "play", file_path: file_path };
    await invoke("play_audio", { event: JSON.stringify(event) }).catch((error) => console.log(error));
  }

  const handlePause = async () => {
    const event = { action: "pause" };
    await invoke("play_audio", { event: JSON.stringify(event) }).catch((error) => console.log(error));
  }

  const handleTest = () => {
    setStatus(!status);
    gloEngine.dispatch('stopOrStart', status);
    status? handleRecovery() : handlePause();
  }

  const handleRecovery = async () => {
    const event = { action: "recovery" };
    await invoke("play_audio", { event: JSON.stringify(event) }).catch((error) => console.log(error));
  }

  return <div className="min-h-screen">
    <div className="absolute top-[10px] left-[10px] cursor-pointer" onClick={goBack}>back</div>
    <button className="absolute top-[10px] left-[100px]" onClick={handleTest}>{
      status ? 'start' : 'stop'
    }</button>
    <canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
  </div>
}

Welcome.displayName = "Welcome";
export default Welcome;