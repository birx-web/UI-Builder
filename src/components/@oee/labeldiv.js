import { dataComponentId } from '../common';

const labeldiv = {
    name: 'Label Div',
    image: 'icons/label.svg',
    html: `<div class="everyOutbox-left draggable">
                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
                <span ${dataComponentId}="html/span@oee" class="theme">Period</span>
           </div>`
};

export default labeldiv;