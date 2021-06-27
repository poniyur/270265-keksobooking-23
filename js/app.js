import {generateTestData} from './dataGenerator.js';
import {init as cardsInit} from './cards.js';


const run = () => {
  cardsInit(generateTestData());
};

export {run};
