'use strict'

var HeapHead = function () {
    this.children = [];
    this.height = 0;
};

HeapHead.prototype.add = function (node) {
    var newNode = new SimpleHeap (node);
    this.children.push (newNode);
    if (this.height < 1) {
        this.height = 1;
    }
};

HeapHead.prototype.deleteMin = function () {
    if (this.children.length !== 1) {
        return null;
    }
    var node = this.children[0].node;
    this.height = this.children[0].height;
    this.children = this.children[0].children;

    return node;
};

HeapHead.prototype.getSorted = function () {
    if (this.children.length === 1) {
        return this.children[0].getSorted().reverse(); 
    }
    return [];
};

// sort descending by height
HeapHead.prototype.sortChildren = function () {
    this.children.sort(function (a, b) {
        return b.height - a.height;
    });
};

HeapHead.prototype.getNextComparison = function () {
    if (this.children.length === 0) {
        return null;
    }
    if (this.children.length === 1) {
        return this.children[0].getNextComparison();
    }
    var end = this.children.length - 1;
    return {left: this.children[end - 1].node, right: this.children[end].node};
};

HeapHead.LEFT = 0;
HeapHead.RIGHT = 1;
HeapHead.prototype.doComparison = function (larger) {
    if (this.children.length === 0) {
        return;
    }
    if (this.children.length === 1) {
        this.children[0].doComparison(larger);
        return;
    }

    var end = this.children.length - 1;
    if (larger === HeapHead.LEFT) {
        this.children[end - 1].merge(this.children[end]);
    }
    else if (larger === HeapHead.RIGHT) {
        this.children[end].merge(this.children[end - 1]);
        this.children[end - 1] = this.children[end];
    }

    this.children.pop();

    var height = this.children[end - 1].height + 1;
    this.height = this.height < height ? height : this.height;
    this.sortChildren();
};






var SimpleHeap = function (node) {
    this.node = node;
    this.children = [];
    this.height = 1;
};

SimpleHeap.prototype.sortChildren = HeapHead.prototype.sortChildren;
SimpleHeap.prototype.getNextComparison = HeapHead.prototype.getNextComparison;
SimpleHeap.prototype.doComparison = HeapHead.prototype.doComparison;

SimpleHeap.prototype.merge = function (heap) {
    this.children.push(heap);
    if (this.height < heap.height + 1) {
        this.height = heap.height + 1;
    }
    this.sortChildren();
};

SimpleHeap.prototype.getSorted = function () {
    // if 0, then the whole list is sorted, if > 1 then the rest of
    // the list os not sorted yet
    if (this.children.length !== 1) {
        return [this.node];
    }
    var arr = this.children[0].getSorted();
    arr.push(this.node);
    return arr;
}
