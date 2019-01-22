import { dataComponentId, deletableComponent, mr_sm_2, draggableComponent, inlineComponent, resizableComponent, defaultWidthComponent } from '../common';
import { labelid } from './ids';
import { labelProperties as properties } from '../properties/label';

const label = {
    name: 'Label',
    nodes: ['label'],
    image: 'icons/label.svg',
    html: `<label for="" ${dataComponentId}="${labelid}" class="${deletableComponent} ${inlineComponent} ${draggableComponent} ${defaultWidthComponent}">Text</label>`,
    properties
};

export default label;