/**
 * Represents a model loaded by the USDZLoader and handles its lifecycle in the THREE context
 */
class USDZInstance {
  constructor(fileName, usdModule, driver, renderInterface, targetGroup) {
    this.driver = driver;
    this.targetGroup = targetGroup;
    this.usdModule = usdModule;
    this.renderInterface = renderInterface;
    this.fileName = fileName;
    const stage = this.driver.GetStage();
    this.endTimecode = stage.GetEndTimeCode();
    this.timeout = 1000 / stage.GetTimeCodesPerSecond();
  }

  /**
   * Returns the USDz instance container
   * @returns {THREE.Group}
   */
  getGroup() {
    return this.targetGroup;
  }

  /**
   * If there are some animations on this model, call this function to call the update loop of the animation
   * A time that evolves must be given for the animation to update
   * @param {number} seconds
   */
  update(seconds) {
    const time = (seconds * (1000 / this.timeout)) % this.endTimecode;
    this.driver.SetTime(time);
    this.driver.Draw();
  }

  /**
   * Destroys the associated THREE.Group and unlink the data from the usd module driver
   */
  clear() {
    this.targetGroup.clear();
    this.usdModule.FS.unlink(this.fileName);
  }
}

export default USDZInstance;
