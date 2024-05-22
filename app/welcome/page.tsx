"use client"
import { useEffect } from "react";
import { createRuntime } from "./runtimeModel";
export default () =>{
    useEffect(() => {
		createRuntime();
	}, []);
    return <div className="min-h-screen">
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
    </div>
}