/**
 * Initiailse a debugger to keep track of method execution times
 * @class
 * @param {boolean} state - Whether to turn on/off debug reporting
 * @returns {void}
 */
var Debug = function (state) {

  this.__constructor = function (state) {
    
    this.longtime = 150;
    this.timers = {};
    this.multiple = true;
    this.timerStarted = false;
    
    if (state) {
      this.on();
    }
    else {
      this.off();
    }

  }

  /**
   * Turn on debug reporting
   * @returns {void}
   */
  this.on = function () {
    this.reporting = true;
    console.log("Debugging on...");
  }

  /**
   * Turn off debug reporting
   * @returns {void}
   */
  this.off = function () {
    this.reporting = false;
    console.log("Debugging off...");
  }

  /**
   * Starts another debug timer
   * @param {string} name - The timer name
   * @returns {void}
   */
  this.start = function (name) {
    this.timers[name] = null;
    if (this.multiple || (!this.multiple && !this.timerStarted)) {
      this.timers[name] = performance.now();
      this.timerStarted = true;
    }
  }

  /**
   * Ends the timer with the name given
   * @param {string} name - The timer name
   * @returns {void}
   */
  this.end = function (name) {
    endTime = performance.now();
    if (this.timers[name]) {
      difference = endTime - this.timers[name];
      this.report(name, difference);
      this.timerStarted = false;
    }
  }

  /**
   * Outputs the time taken for the timer given
   * Shows a warning if over the 'long timer' threshold
   * @param {string} name - The timer name
   * @param {float} time - The time taken
   * @returns {void}
   */
  this.report = function (name, difference) {
    if (this.reporting && console) {
      if (difference > this.longtime) {
        console.warn(name + ": " + difference.toPrecision(4) + "ms");
      }
      else {
        console.info(name + ": " + difference.toPrecision(4) + "ms");
      }
    }
  }

  return this.__constructor(state);

}