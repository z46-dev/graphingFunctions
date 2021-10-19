(function() {
    // The mouse object
    const mouse = {
        x: 0,
        y: 0
    };
  
    // Lerp function to smoothen it out
    function lerp(a, b, x) {
        return a + (b - a) * x;
    }
  
    // The list of elements
    let elements = [];
  
    // The element object that we create for each one
    class Element {
        constructor(element) {
            this.element = element;
            this.dragging = false;
            this.x = 0;
            this.y = 0;
            elements.push(this);
        }
        update() {
            this.x = lerp(this.x, mouse.x, .1);
            this.y = lerp(this.y, mouse.y, .1);
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
        check(event) {
            return event.target.id === this.element.id;
        }
    }
    
    // Mouse Down event, bind them to the mouse if our mouse is over it.
    function mouseDown(event) {
        for (let index = 0, length = elements.length; index < length; index ++) {
            const element = elements[index];
            element.enabled = element.check(event);
        }
    }
    
    // Mouse Up event, unbind all from the mouse
    function mouseUp(event) {
        for (let index = 0, length = elements.length; index < length; index ++) {
            elements[index].enabled = false;
        }
    }
  
    // Mouse Move event, update the mouse position
    function mouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
  
    // The update loop
    function update() {
        if (!elements.some(element => element.enabled)) return;
        for (let index = 0, length = elements.length; index < length; index ++) {
            const element = elements[index];
            if (element.enabled) {
                element.update();
            }
        }
    }
    
    // Apply our listeners
    document.body.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp);
    document.body.addEventListener("mousemove", mouseMove);
  
    // Update at 60 FPS
    setInterval(update, 1000 / 60);
  
    // The actual thing people use
    window.addDraggableEvent = function addDraggableEvent(element) {
        if (element.style.position !== "absolute") element.style.position = "absolute";
        element.draggable = new Element(element);
    }
})();