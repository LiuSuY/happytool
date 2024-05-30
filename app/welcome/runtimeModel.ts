/**
 * @title Animation Play
 * @category Animation
 */
// import * as dat from "dat.gui";
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
  Script,
  ShadowType,
  PrimitiveMesh,
  MeshRenderer,
  PBRMaterial,
} from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
async function createRuntime() {
  Logger.enable();
  let gloAnimator: Animator;
  return await WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
    engine.canvas.resizeByClientSize();
    engine.canvas.width = window?.innerWidth ?? 300 * SystemInfo.devicePixelRatio;
    engine.canvas.height = window?.innerHeight ?? 300 * SystemInfo.devicePixelRatio;
    const scene = engine.sceneManager.activeScene;
    const rootEntity = scene.createRootEntity();
    scene.ambientLight.diffuseSolidColor = new Color(1, 1, 1, 0.5);

    const { background } = scene;

    // 添加纯色背景
    background.mode = BackgroundMode.SolidColor; // 默认纯色背景
    background.solidColor = new Color(1, 0, 0, 0); // 透明

    // camera
    const cameraEntity = rootEntity.createChild("camera_node");
    cameraEntity.transform.position = new Vector3(0, 1, 4);
    cameraEntity.addComponent(Camera);
    cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);
    const lightNode = rootEntity.createChild("light_node");
    lightNode.addComponent(DirectLight).intensity = 0.6;
    lightNode.transform.lookAt(new Vector3(0, 0, 1));
    lightNode.transform.rotate(new Vector3(0, 90, 0));
    const lightEntity = rootEntity.createChild("light_node");
    const light = lightEntity.addComponent(DirectLight);
    lightEntity.transform.setPosition(-10, 10, 10);
    lightEntity.transform.lookAt(new Vector3(0, 0, 0));

    light.shadowType = ShadowType.SoftHigh;

    const planeEntity = rootEntity.createChild("plane_node");
    const renderer = planeEntity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
    const planeMaterial = new PBRMaterial(engine);
    renderer.setMaterial(planeMaterial);
    class ControlScript extends Script {
      onAwake() {
        engine.on('stopOrStart', (status:boolean): void => {
          if (status) {
            gloAnimator.speed = 1;
          } else {
            gloAnimator.speed = 0;
          }
        });
      }
    }
    engine.resourceManager
      .load<GLTFResource>('./model.glb')
      .then((gltfResource) => {
        const { defaultSceneRoot } = gltfResource;
        const animator = defaultSceneRoot.getComponent(Animator);

        animator?.play("run");
        if (animator) {
          animator.speed = 1;
          gloAnimator = animator;
        }
        rootEntity.addChild(defaultSceneRoot);
      });
    rootEntity.addComponent(ControlScript);
    return engine;
  })
}

export async function getEngine() {
  const engine = await createRuntime();
  return engine;
};