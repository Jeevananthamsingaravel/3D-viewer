import { RenderDelegateInterface } from "./ThreeJsRenderDelegate";
import USDZInstance from "./USDZInstance";
import USDZLoaderUtils from "./Utils/utils";
export class USDZLoader {
  constructor(dependenciesDirectory = "") {
    this.initialize(dependenciesDirectory);
  }

  /**
   * Initializes the WASM module
   */
  async initialize(depDirectory) {
    // Create script tag on the page and gathers the module
    const usdBindingsTag = document.createElement("script");
    usdBindingsTag.onload = async () => {
      // On iOS we limit the maximum memory to avoid out of range error
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      let maxMemory = undefined;
      if (isIOS) {
        maxMemory = 838860800;
        console.log(
          "iOS device detected, reducing maximum memory to " + maxMemory
        );
      }

      // Get the module
      try {
        const module = await window.getUsdModule(
          undefined,
          depDirectory,
          maxMemory
        );
        const moduleReady = await module.ready;
        if (moduleReady) {
          this.usdModule = module;
        }
      } catch (e) {
        console.error("USDZ module could not initialize, error: " + e);
      } finally {
        this.moduleLoadingCompleted = true;
      }
    };
    let urlPath = "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/emHdBindings.js?sp=r&st=2023-11-21T12:00:40Z&se=2023-12-08T20:00:40Z&sv=2022-11-02&sr=b&sig=ofE%2BB3gb%2BbjeqhWBPp9KZulzJc5R93C8HuiGwqNOt%2F0%3D";
    // let urlPath = ;
    const response = await fetch(urlPath);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    usdBindingsTag.setAttribute("src",URL.createObjectURL(blob));
    document.head.appendChild(usdBindingsTag);
  }

  /**
   * Gathers the module while ensuring it's ready to be used
   * Returns null if the loading was completed with error
   */
  
  async waitForModuleLoadingCompleted() {
    while (!this.moduleLoadingCompleted) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return this.usdModule;
  }

  /**
   * Loads a USDZ file into the target ThreeJS Group
   * @param file
   * @param targetGroup
   */
  async loadFile(file, targetGroup) {
    if (this.modelIsLoading) {
      this.modelIsLoading = false;
      // throw "A model is already loading. Please wait.";
    }

    // Wait for module to be ready
    await this.waitForModuleLoadingCompleted();

    // Make sure module is ready
    if (this.usdModule == null) {
      this.modelIsLoading = false;
      throw "Cannot load file. The module could not be loaded properly.";
    }

    // Notice start of loading
    this.modelIsLoading = true;

    // Read the file as a byte array
    const result = await USDZLoaderUtils.readFileAsync(file);

    // Load the raw data with the module
    try {
      const instance = this.loadUsdFileFromArrayBuffer(
        this.usdModule,
        file.name,
        result,
        targetGroup
      );
      // Notice end of loading
      this.modelIsLoading = false;
      return instance;
    } catch (e) {
      this.modelIsLoading = false;
      throw e;
    }
  }

  /**
   * Raw methods that loads the USDZ file array buffer into the target ThreeJS Group
   * @param filename
   * @param usdFile
   * @param targetGroup
   */
  loadUsdFileFromArrayBuffer(usdModule, filename, usdFile, targetGroup) {
    // Generate random filename to avoid conflict when opening a file multiple times
    const extension = USDZLoaderUtils.getFileExtension(filename);
    const randomFileName = USDZLoaderUtils.getRandomGuid();
    const inputFileName = randomFileName + "." + extension;

    // Give the RAW data to the USD module
    usdModule.FS.createDataFile(
      "/",
      inputFileName,
      new Uint8Array(usdFile),
      true,
      true,
      true
    );

    // Create Render Interface / Driver
    const renderInterface = new RenderDelegateInterface(
      inputFileName,
      targetGroup
    );
    const driver = new usdModule.HdWebSyncDriver(
      renderInterface,
      inputFileName
    );
    renderInterface.setDriver(driver);
    driver.Draw();

    // Returns an object of with all of this that can be manipulated later
    const instance = new USDZInstance(
      inputFileName,
      usdModule,
      driver,
      renderInterface,
      targetGroup
    );
    return instance;
  }
}
