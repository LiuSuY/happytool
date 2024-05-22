/**
 * @title Animation Play
 * @category Animation
 */
import * as dat from "dat.gui";
import {
  Animator,
  Camera,
  DirectLight,
  GLTFResource,
  BackgroundMode,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine,
  Color,
} from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
const gui = new dat.GUI();
export function createRuntime() {
  Logger.enable();
  WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
    engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
    engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
    const scene = engine.sceneManager.activeScene;
    const rootEntity = scene.createRootEntity();
    scene.ambientLight.diffuseSolidColor = new Color(1, 1, 1, 0.5);

    const { background } = scene;

    // 添加纯色背景
    background.mode = BackgroundMode.SolidColor; // 默认纯色背景
    background.solidColor = new Color(1, 0, 0, 0); // 透明

    // camera
    const cameraEntity = rootEntity.createChild("camera_node");
    cameraEntity.transform.position = new Vector3(1, 1, 3);
    cameraEntity.addComponent(Camera);
    cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

    const lightNode = rootEntity.createChild("light_node");
    lightNode.addComponent(DirectLight).intensity = 0.6;
    lightNode.transform.lookAt(new Vector3(0, 0, 1));
    lightNode.transform.rotate(new Vector3(0, 90, 0));
    

    engine.resourceManager
      .load<GLTFResource>('./model.glb')
      .then((gltfResource) => {
        const { animations = [], defaultSceneRoot } = gltfResource;
        rootEntity.addChild(defaultSceneRoot);
        const animator = defaultSceneRoot.getComponent(Animator);
        animator?.play("run");

        initDatGUI(animator, animations);
      });

    engine.run();

    const initDatGUI = (animator: Animator | null, animations: any[]) => {
      const animationNames = animations
        .filter((clip: { name: string | string[]; }) => !clip.name.includes("pose"))
        .map((clip: { name: any; }) => clip.name);
      const debugInfo = {
        animation: animationNames[0],
        speed: 1,
      };

      gui.add(debugInfo, "animation", animationNames).onChange((v) => {
        animator?.play(v);
      });

      gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
        animator!.speed = v;
      });
    };
  });
}