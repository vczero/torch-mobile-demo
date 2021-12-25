import type {ModelInfo} from 'react-native-pytorch-core';


export const NLPModels: ModelInfo[] = [
  {
    name: 'DistilBertQA',
    model: require('../models/bert_qa.ptl'),
  }
];
