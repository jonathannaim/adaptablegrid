var Cell = function (row, col) {

    /**
     * Cell.__constructor
     * Initialise the cell object
     * @constructor
     * @param {integer} index - The index of the cell
     * @returns {Cell}
     */
    this.__constructor = function (row, col) {
        this.row = row;
        this.col = col;
    }

    /**
     * Cell.setValue
     * Sets the value of the current cell
     * @param {any} v - Any type can be in the cell
     * @returns {null}
     */
    this.setValue = function (v) {
        this.val = v;
    }

    /**
     * Cell.getValue
     * Gets the value of the current cell
     * @returns {any}
     */
    this.getValue = function (v) {
        return this.val;
    }

    /**
     * Cell.setFormat
     * Sets the format of the current cell
     * @param {string} format - The format, out of: $txt, $num, $price, $date
     * @returns {null}
     */
    this.setFormat = function (f) {
        this.format = f;
    }

    /**
     * Cell.getFormat
     * Gets the format of the current cell
     * @returns {string}
     */
    this.getFormat = function () {
        return this.format;
    }

    /**
     * Cell.getFormattedValue
     * Displays the value into the correct displayed form, using the given format
     * @param {AdaptableGrid} grid - A reference to the containing grid
     * @returns {string}
     */
    this.getFormattedValue = function (grid) {
        format_type = this.format.split("{");
        switch (format_type[0]) {
            case "$price":
                currencyCol = grid.columns.indexOf(format_type[1].split("}")[0]);
                return Currency.formatNumber(this.getValue(), grid.cells[this.row][currencyCol].getValue());
            case "$num":
                return this.getValue().toFixed(format_type[1].split("}")[0]);
            case "$date":
                return '<input type="text" class="adaptablegrid-datepicker" blotter-format="'+format_type[1].split("}")[0]+'"' +
                        'readonly="readonly" value="' + this.getValue() + '" />';
            case "$bool":
                return '<input type="checkbox" class="adaptablegrid-checkbox" '+(this.getValue() ? 'checked="checked"' : '')+' />';
            default:
                return this.getValue();
        }
    }

    return this.__constructor(row, col);

}