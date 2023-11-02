class USDZLoaderUtils {
  /**
   * Read a file async and returns an array buffer
   * @param {File} file
   * @returns {Promise<string | ArrayBuffer | null>}
   */
  static readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Generate random string GUID
   * @returns {string}
   */
  static getRandomGuid() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  /**
   * Given a file name / path, returns the file extension
   * @param {string} filePath
   * @returns {string}
   */
  static getFileExtension(filePath) {
    let extension = filePath.split('.').pop();
    if (extension === undefined) {
      throw 'Cannot determine extension';
    }
    extension = extension.split('?')[0];
    return extension;
  }
}

export default USDZLoaderUtils;
