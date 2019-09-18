/**
 * File:        mandelbrot.js
 * Author:      ////////
 * Created On:  07/09/2019
 * Description: /////////////////// 
*/

const domId = config.environment.domId;

window.onload = initProgram;

function initProgram() {
    /**
     * @summary
     * A function to define the program flow
     * 
     * @author
     * Anonymous
     */

    try {
        createDOMStructure();                       // Calling a custom function

        addText("Canvas Width", domId.divCanvasWidth);
        inputNumberBox(domId.inputCanvasWidth, domId.divCanvasWidth);

        inputPixelCoordinates(domId.inputPixelCoordinate, domId.divPixelCoordinate);    // Calling a custom function

        createButton(domId.buttonSubmit, 'Submit', domId.divPixelCoordinate);

        handleMandelbrotActions();             // Calling a custom function
    }
    catch {
        LOGERROR("initProgram().", "Unable to load program.");
        alert("[-]ERROR: Unable to load program.");
    }
}

function createDOMStructure() {
    /**
     * @summary
     * Function to create the basic DOM structure of HTML
     * 
     * @author
     * Anonymous
     */

    try {
        var divCanvasWidth = document.createElement("DIV");
        divCanvasWidth.id = domId.divCanvasWidth;
        document.body.appendChild(divCanvasWidth);

        var divPixelCoordinate = document.createElement("DIV");
        divPixelCoordinate.id = domId.divPixelCoordinate;
        document.body.appendChild(divPixelCoordinate);

        var divResult = document.createElement("DIV");
        divResult.id = domId.divResult;
        document.body.appendChild(divResult);
    }
    catch {
        LOGERROR("createDOMStructure().", "Unable to create DOM structure.");
        alert("[-]ERROR: Unable to create DOM structure.");
    }
}

function inputPixelCoordinates(pixelCoordinatesId, htmlDOMParent) {
    /**
     * @summary
     * Function to display input box in HTML
     * 
     * @author
     * Anonymous
     * 
     * @param pixelCoordinatesId
     * The coordinate values by the user
     * @param htmlDOMParent
     */

    LOGDEBUG("inputPixelCoordinates().", "inputPixelCoordinates() called.");

    try {
        addText("Pixel Coordinate 0", htmlDOMParent);
        var pixelCoordinate0Input = inputNumberBox(pixelCoordinatesId + "0", htmlDOMParent);

        addText("Pixel Coordinate 1", htmlDOMParent);
        var pixelCoordinate1Input = inputNumberBox(pixelCoordinatesId + "1", htmlDOMParent);
    }
    catch {
        LOGERROR("inputPixelCoordinates().", "Unable to create input fields.");
        alert("[-]ERROR: Unable to create input fields.");
    }
}

function handleMandelbrotActions() {
    /**
     * @summary
     * Function to handle interpolation actions on width and pixel coordinates
     * 
     * @author
     * Anonymous
     */

    document.getElementById(domId.buttonSubmit).onclick = function () {
        LOGDEBUG("handleMandelbrotActions()", "Click event triggered on buttonSubmit.");

        try {
            clearElement(domId.divResult);

            var complexValueX = map_point(0, parseInt(getValue(domId.inputCanvasWidth)),
                [-2], [2],
                parseInt(getValue(domId.inputPixelCoordinate + '1')));
            var complexValueY = map_point(0, parseInt(getValue(domId.inputCanvasWidth)),
                [2], [-2],
                parseInt(getValue(domId.inputPixelCoordinate + '0')));

            var webGLValueX = map_point(0, parseInt(getValue(domId.inputCanvasWidth)),
                [-1], [1],
                parseInt(getValue(domId.inputPixelCoordinate + '1')));
            var webGLValueY = map_point(0, parseInt(getValue(domId.inputCanvasWidth)),
                [1], [-1],
                parseInt(getValue(domId.inputPixelCoordinate + '0')));

            addText('Part A = ' + [complexValueX, complexValueY], domId.divResult);
            addText('Part B = ' + [webGLValueX, webGLValueY], domId.divResult);
        }
        catch {
            LOGERROR("handleInterpolateActions().", "Unable to handle click event.");
            alert("[-]ERROR: Unable to handle click event.");
        }
    }
}