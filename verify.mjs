import { LA_L_SERIES } from './js/domains/speakers/data/la/l-series.data.js';
import { cardHTML, modalBodyHTML } from './js/domains/speakers/speakers.view.js';

const l1d = LA_L_SERIES.find(d => d.id === 'spk-la-l1d');
const l1 = LA_L_SERIES.find(d => d.id === 'spk-la-l1'); // no imgBack

console.log('--- L1D card (has imgBack) ---');
const card1 = cardHTML(l1d);
console.log('has card__img--front:', card1.includes('card__img--front'));
console.log('has card__img--back:', card1.includes('card__img--back'));
console.log('imgBack path used:', card1.includes(l1d.imgBack));

console.log('--- L1 card (no imgBack) ---');
const card2 = cardHTML(l1);
console.log('has card__img--front (should be false):', card2.includes('card__img--front'));
console.log('has plain card__img:', card2.includes('class="card__img"'));

console.log('--- L1D modal (has imgBack) ---');
const modal1 = modalBodyHTML(l1d, null);
console.log('has view-switch:', modal1.body.includes('modal__view-switch'));
console.log('has Front/Rear buttons:', modal1.body.includes('data-view-switch="front"') && modal1.body.includes('data-view-switch="rear"'));

console.log('--- L1 modal (no imgBack) ---');
const modal2 = modalBodyHTML(l1, null);
console.log('has view-switch (should be false):', modal2.body.includes('modal__view-switch'));
