"use client"
import { useEffect, useState } from "react";
import { getEngine } from "./runtimeModel";
import useBack from "../hooks/useBack";
import { WebGLEngine } from "@galacean/engine";

let gloEngine: WebGLEngine;
export default () => {
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

  const handleTest = () => {
    setStatus(!status);
    gloEngine.dispatch('stopOrStart',status);
  }

  return <div className="min-h-screen">
    <div className="absolute top-[10px] left-[10px] cursor-pointer" onClick={goBack}>back</div>
    <button className="absolute top-[10px] left-[100px]" onClick={handleTest}>{
      status? 'start' : 'stop'
    }</button>
    <canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
  </div>
}