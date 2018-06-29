'use strict'

var TaskSort = function (elem) {
    this.heap = new HeapHead();
    this.elem = elem;
    this.draw();
};

TaskSort.prototype.draw = function () {
    this.elem.innerHTML = "";

    var newTask = Draw.elem ("div", {}, this.elem);
    Draw.elem ("h2", {}, newTask).textContent = "Task additions";
    var input = Draw.elem ("input", {
        "type": "text"
    }, newTask);
    var submit = Draw.elem ("button", {}, newTask);
    submit.textContent = "Add task";
    submit.addEventListener("click", this.addTask.bind(this, input));

    var compare = this.heap.getNextComparison();
    if (compare !== null) {
        var comparisonSection = Draw.elem ("div", {}, this.elem);
        Draw.elem ("h2", {}, comparisonSection).textContent = "Which is more important?";
        
        var leftBtn = Draw.elem ("button", {}, comparisonSection);
        leftBtn.textContent = compare.left;
        leftBtn.addEventListener("click", this.doComparison.bind(this, HeapHead.LEFT));
        
        Draw.elem ("span", {}, comparisonSection).textContent = "or";

        var rightBtn = Draw.elem ("button", {}, comparisonSection);
        rightBtn.textContent = compare.right;
        rightBtn.addEventListener("click", this.doComparison.bind(this, HeapHead.RIGHT));
    }

    Draw.elem ("h2", {}, newTask).textContent = "Top elements";
    var list = Draw.elem("ol", {}, this.elem);
    this.heap.getSorted().forEach(function (item) {
        Draw.elem("li", {}, list).textContent = item;
    });
};

TaskSort.prototype.addTask = function (elem) {
    if (!elem.value) {
        return;
    }
    this.heap.add(elem.value);
    this.draw();
};

TaskSort.prototype.doComparison = function (direction) {
    this.heap.doComparison(direction);
    this.draw();
}


