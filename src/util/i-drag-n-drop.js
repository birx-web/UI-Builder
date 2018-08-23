function isAlign(targetOffset, currentOffset) {
    return {
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 0.7,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 0.7
    };
}

function removeAlignmentLines() {
    $('.horizontal-line, .vertical-line').remove();
}

function drawAlignmentLine(target) {
    let horizontalLineExists = false;
    let verticalLineExists = false;
    const targetOffset = $(target).offset();
    // 排除自身元素和该元素子元素
    [...$('body *:visible:not(script)')
        .not(target)
        .not($(target).find('*'))]
        .some(currentValue => {
            const currentOffset = $(currentValue).offset();
            const { isHorizontalAlign, isVerticalAlign } = isAlign(targetOffset, currentOffset);
            if (!horizontalLineExists && isHorizontalAlign) {
                $('<hr />')
                    .addClass('horizontal-line')
                    .css({
                        top: targetOffset.top
                    })
                    .appendTo($('body'));
                horizontalLineExists = true;
            }
            if (!verticalLineExists && isVerticalAlign) {
                $('<hr />')
                    .addClass('vertical-line')
                    .css({
                        left: targetOffset.left
                    })
                    .appendTo($('body'));
                verticalLineExists = true;
            }
            return horizontalLineExists && verticalLineExists;
        });
}

function arrowKeyMove(key, element) {
    removeAlignmentLines();

    let dx = 0, dy = 0;
    switch (key) {
        case 37: // left
            dx = -1;
            break;
        case 38: // up
            dy = -1;
            break;
        case 39: // right
            dx = 1;
            break;
        case 40: // down
            dy = 1;
            break;
        default: return; // exit this handler for other keys
    }

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(element.attr('data-x')) || 0) + dx,
        y = (parseFloat(element.attr('data-y')) || 0) + dy;

    element.css({
        transform: `translate(${x}px, ${y}px)`
    });

    // update the position attributes
    element.attr('data-x', x);
    element.attr('data-y', y);

    drawAlignmentLine(element.get(0));
}

function updatePosition(target, event) {
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

export { removeAlignmentLines, arrowKeyMove, drawAlignmentLine, updatePosition };