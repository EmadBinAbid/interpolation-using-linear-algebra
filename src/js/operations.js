/**
 * File:        operations.js
 * Author:      Anonymous
 * Created On:  07/09/2019
 * Description: /////////////////// 
*/

const vectorCount = config.environment.global.vectorCount;
const domId = config.environment.domId;

window.onload = initProgram;

function initProgram() {
    /**
     * @summary
     * Function to define the program flow
     * 
     * @author
     * Anonymous
     */

    LOGDEBUG("initProgram().", "initProgram() called.");

    document.body.innerHTML = '';
    createDOMStructure();                   // Calling a custom function

    // Input dimension
    addText("Dimension", domId.divDimension);
    var dimensionInput = inputNumberBox(domId.inputDimension, domId.divDimension);
    dimensionInput.min = 2;
    dimensionInput.max = 4;

    createButton(domId.buttonSubmitDimension, "Enter Dimension", domId.divDimension);

    document.getElementById(domId.buttonSubmitDimension).onclick = function () {
        LOGDEBUG("initProgram().", "Event on BUTTON buttonSubmitDimension triggered.");
        handleDimensionActions();           // Calling a custom function
    };
}

function createDOMStructure() {
    /**
     * @summary
     * Function to create the basic DOM structure of HTML
     * 
     * @author
     * Anonymous
     */

    var divDimension = document.createElement("DIV");
    divDimension.id = domId.divDimension;
    document.body.appendChild(divDimension);

    var divVectors = document.createElement("DIV");
    divVectors.id = domId.divVectors;
    document.body.appendChild(divVectors);

    var divMenu = document.createElement("DIV");
    divMenu.id = domId.divMenu;
    document.body.appendChild(divMenu);

    var divResult = document.createElement("DIV");
    divResult.id = domId.divResult;
    document.body.appendChild(divResult);
}

function inputVectors(numberOfVectors, vectorNamePatternId, htmlDOMParent) {
    /**
     * @summary
     * Function to input vector of desired dimension
     * 
     * @author
     * Anonymous
     * 
     * @param numberOfVectors
     * The name of vector to display
     * @param vectorNamePatternId
     * The id of pattern of vectors to be generated
     * @param htmlDOMParent
     */

    LOGDEBUG("inputVectors().", "inputVectors() called.");

    var vectorDimension = getValue(domId.inputDimension);
    for (var count = 0; count < numberOfVectors; count++) {
        addText("Vector " + count, htmlDOMParent);
        for (var i = 0; i < vectorDimension; i++) {
            var vectorInput = inputNumberBox(vectorNamePatternId + count + "Component" + i, htmlDOMParent);
            vectorInput.placeholder = "Component " + i;
        }
    }
}

function createVectors() {
    /**
     * @summary
     * Function to return vector dimension
     * 
     * @author
     * Anonymous
     * 
     * @returns
     * An array/list of vectors
     */

    var vectorArray = [];
    const dimension = getValue(domId.inputDimension);
    const vectorNamePatternId = domId.inputVector;

    var vector;

    for (var v = 0; v < vectorCount; v++) {
        if (dimension == 2) {
            vector = vec2(parseFloat(getValue(vectorNamePatternId + v + 'Component0')), parseFloat(getValue(vectorNamePatternId + v + 'Component1')));
        }
        else if (dimension == 3) {
            vector = vec3(parseFloat(getValue(vectorNamePatternId + v + 'Component0')), parseFloat(getValue(vectorNamePatternId + v + 'Component1')), parseFloat(getValue(vectorNamePatternId + v + 'Component2')));
        }
        else if (dimension == 4) {
            vector = vec4(parseFloat(getValue(vectorNamePatternId + v + 'Component0')), parseFloat(getValue(vectorNamePatternId + v + 'Component1')), parseFloat(getValue(vectorNamePatternId + v + 'Component2')), parseFloat(getValue(vectorNamePatternId + v + 'Component3')));
        }
        else {
            LOGINFO("createVectors().", "Vectors not defined for dimensions of less than 2 and greater than 4.");
            alert("[!]INFO: Out of range. Vectors not defined for dimensions of less than 2 and greater than 4.");
        }
        vectorArray.push(vector);
    }
    return vectorArray;
}

function generateMenu(menuTitle, htmlDOMParent) {
    /**
     * @summary
     * Function to create a menu of buttons via JavaScript
     * 
     * @author
     * Anonymous
     * 
     * @param menuTitle
     * Name/Title of menu to be displayed
     * 
     * @param htmlDOMParent
     * The HTML DOM parent element under which the menu will be created
     */

    LOGDEBUG("generateMenu().", "generateMenu() called.");
    createLineBreak(htmlDOMParent);
    createLineBreak(htmlDOMParent);

    document.getElementById(htmlDOMParent).innerHTML = menuTitle;

    createButton(domId.buttonMenuOption1, 'Check Vector Equality', htmlDOMParent);
    createButton(domId.buttonMenuOption2, 'Show Vector Lengths', htmlDOMParent);
    createButton(domId.buttonMenuOption3, 'Show Normalized Vectors', htmlDOMParent);
    createButton(domId.buttonMenuOption4, 'Show Vector Sum', htmlDOMParent);
    createButton(domId.buttonMenuOption5, 'Show Vector Difference', htmlDOMParent);
    createButton(domId.buttonMenuOption6, 'Show Dot Product', htmlDOMParent);
    createButton(domId.buttonMenuOption7, 'Show Cross Product', htmlDOMParent);
    createButton(domId.buttonMenuOption8, 'Play Again!', htmlDOMParent);
    createButton(domId.buttonMenuOption9, 'Exit Program', htmlDOMParent);
}

function handleDimensionActions() {
    /**
     * @summary
     * Function to handle dimension button actions
     * 
     * @author
     * Anonymous
     */

    LOGDEBUG("handleDimensionActions().", "handleDimensionActions() called.");

    var inputDimensionValue = getValue(domId.inputDimension);

    if (inputDimensionValue) {
        if (inputDimensionValue >= 2 && inputDimensionValue <= 4) {
            LOGDEBUG("handleDimensionActions().", "Valid dimension value.");

            // document.getElementById(domId.divDimension).innerHTML = '';

            inputVectors(vectorCount, domId.inputVector, domId.divVectors);         // Calling a custom function

            createButton(domId.buttonSubmitVectors, "Enter Vectors", domId.divVectors);

            handleVectorActions();                      // Calling a custom function
        }
        else {
            LOGERROR("handleDimensionActions().", "Invalid value. Enter value between 2 and 4 (inclusive).");
            alert("[-]ERROR: Invalid value. Enter value between 2 and 4 (inclusive).")
        }
    }
    else {
        LOGERROR("handleDimensionActions().", "Value not found. Please enter the required value.");
        alert("[!]INFO: Value not found. Please enter the required value.");
    }
}

function handleVectorActions() {
    /**
     * @summary
     * Function to handle vector actions
     * 
     * @author
     * Anonymous
     */

    LOGDEBUG("handleVectorActions().", "handleVectorActions() called.");
    document.getElementById(domId.buttonSubmitVectors).onclick = function () {
        var inputDimension = getValue(domId.inputDimension);
        console.log(inputDimension);
        var isComponentEmpty = 0;
        var i = 0;

        for (i = 0; i < inputDimension; i++) {
            console.log(i);
            if (!(getValue(domId.inputVector + '0Component' + i) && getValue(domId.inputVector + '1Component' + i))) {
                isComponentEmpty = 1;
            }
        }

        if (isComponentEmpty == 0) {
            var vectorArray = createVectors();                  // Calling a custom function
            document.getElementById(domId.divDimension).innerHTML = '';
            document.getElementById(domId.divVectors).innerHTML = '';
            generateMenu('Select: ', domId.divMenu);                // Calling a custom function
            handleMenuActions(vectorArray);                     // Calling a custom function
        }
        else {
            LOGERROR("handleVectorActions()", "Missing component values.");
            alert("Please fill all vector components");
        }
    }
}

function handleMenuActions(vectorArray) {
    /**
     * @summary
     * Function to handle menu actions
     * 
     * @author
     * Anonymous
     * 
     * @param vectorArray
     * An array/list of vectors
     */

    LOGDEBUG("handleMenuActions().", "handleMenuActions() called.");

    document.getElementById(domId.buttonMenuOption1).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption1 clicked.");
        clearElement(domId.divResult);

        var isEqual = "true";
        for (var v = 0; v < vectorArray.length - 1; v++) {
            if (!equal(vectorArray[v], vectorArray[v + 1])) {
                isEqual = "false";
            }
        }
        addText(isEqual, domId.divResult);
    }

    document.getElementById(domId.buttonMenuOption2).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption2 clicked.");
        clearElement(domId.divResult);

        for (var v = 0; v < vectorArray.length; v++) {
            addText("Length of Vector " + v + " = " + length(vectorArray[v]), domId.divResult);
        }
    }

    document.getElementById(domId.buttonMenuOption3).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption3 clicked.");
        clearElement(domId.divResult);

        for (var v = 0; v < vectorArray.length; v++) {
            var tempArray = Array.from(vectorArray[v]);
            addText("Normalized Vector " + v + " = " + normalize(tempArray), domId.divResult);
        }
    }

    document.getElementById(domId.buttonMenuOption4).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption4 clicked.");
        clearElement(domId.divResult);

        var sumVector = vectorArray[0];
        for (var v = 1; v < vectorArray.length; v++) {
            sumVector = add(sumVector, vectorArray[v]);
        }
        addText("Sum Vector = " + sumVector, domId.divResult);
    }

    document.getElementById(domId.buttonMenuOption5).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption5 clicked.");
        clearElement(domId.divResult);

        var differenceVector = vectorArray[0];
        for (var v = 1; v < vectorArray.length; v++) {
            differenceVector = subtract(differenceVector, vectorArray[v]);
        }
        addText("Difference Vector = " + differenceVector, domId.divResult);
    }

    document.getElementById(domId.buttonMenuOption6).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption6 clicked.");
        clearElement(domId.divResult);

        if (vectorArray.length != 2) {
            LOGINFO("handleMenuActions().", "Feature not available for current number of vectors.");
            alert("Feature not available for current number of vectors.");
        }
        else {
            addText("Dot Product = " + dot(vectorArray[0], vectorArray[1]), domId.divResult);
        }
    }

    document.getElementById(domId.buttonMenuOption7).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption7 clicked.");
        clearElement(domId.divResult);

        if (vectorArray.length != 2) {
            LOGINFO("handleMenuActions().", "Feature not available for current number of vectors.");
            alert("Feature not available for current number of vectors.");
        }
        else {
            try {
                addText("Cross Product = " + cross(vectorArray[0], vectorArray[1]), domId.divResult);
            }
            catch {
                LOGERROR("handleMenuActions().", "Cross product is supported for more than 2 components of vectors.");
                alert("Cross product is supported for more than 2 components of vectors.");
            }
        }
    }

    document.getElementById(domId.buttonMenuOption8).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption8 clicked.");
        initProgram();              // Calling a custom function
    }

    document.getElementById(domId.buttonMenuOption9).onclick = function () {
        LOGDEBUG("handleMenuActions().", "buttonMenuOption9 clicked.");
        document.body.innerHTML = "";
    }
}