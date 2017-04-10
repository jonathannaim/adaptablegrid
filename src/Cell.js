/**
 * An object representing an individual cell in the grid
 * @class
 * @returns {Cell}
 */
var Cell = function () {

  this.__constructor = function () {
    this.cls = [];
    this.readonly = false;
  }

  /**
   * Sets the value of the current cell
   * @param {any} v - Any type can be in the cell
   * @returns {void}
   */
  this.setValue = function (v) {
    this.val = v;
  }

  /**
   * Gets both the raw and formatted value of the current cell
   * @returns {any[]}
   */
  this.getValuePairs = function () {
    return [this.getRawValue(), this.getFormattedValue()];
  }

  /**
   * Gets the value of the current cell
   * @returns {any}
   */
  this.getRawValue = function () {
    return this.val;
  }

  /**
   * Sets the type of the current cell
   * @param {string} type - The type, out of: text, num, date, checkbox
   * @returns {void}
   */
  this.setType = function (t) {
    this.type = t;
  }

  /**
   * Sets the format of the current cell
   * @param {string} format - The format which will be handled by 3rd party scripts
   * @returns {void}
   */
  this.setFormat = function (f) {
    this.format = f;
  }

  /**
   * Gets the type of the current cell
   * @returns {string}
   */
  this.getType = function () {
    return this.type;
  }

  /**
   * Gets the format of the current cell
   * @returns {string}
   */
  this.getFormat = function () {
    return this.format;
  }

  /**
   * Adds a CSS class style to this cell
   * @param {string} c - The new class
   * @returns {void}
   */
  this.addClass = function (c) {
    this.cls.push(c);
  }

  /**
   * Get the array of CSS classes
   * @returns {string[]}
   */
  this.getClasses = function () {
    return this.cls;
  }

  /**
   * Sets this cell to be read-only
   * @returns {void}
   */
  this.setReadOnly = function () {
    this.readonly = true;
  }

  /**
   * Returns true if this cell is read-only
   * @returns {boolean}
   */
  this.isReadOnly = function () {
    return this.readonly;
  }

  /**
   * Displays the value into the correct displayed form, using the given format
   * @param {AdaptableGrid} grid - A reference to the containing grid
   * @returns {string}
   */
  this.getFormattedValue = function (grid) {
    switch (this.type) {
      case DataType.Number:
        if (this.format == "" || this.format == null || this.format == undefined) {
          return this.getRawValue();
        }
        else {
          return numeral(this.getRawValue()).format(this.format);
        }
      case DataType.Date:
        return '<input type="text" class="invisible AdaptableGrid-datepicker" blotter-format="'+this.format+'"' +
            'readonly="readonly" value="' + moment(this.getRawValue()).format(this.format) + '" />';
      case DataType.Boolean:
        return '<input type="checkbox" class="AdaptableGrid-checkbox" '+(this.getRawValue() ? 'checked="checked"' : '')+' />';
      default:
        return this.getRawValue();
    }
  }

  return this.__constructor();

}