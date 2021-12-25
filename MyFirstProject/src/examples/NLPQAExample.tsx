/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';
import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {NLPModels} from '../Models';
import useNLPQAModelInference from '../useNLPQAModelInference';
import ModelPreloader from '../components/ModelPreloader';
import {ScrollView} from 'react-native-gesture-handler';

import {PTLColors as colors, PTLTextBoxStyle} from '../components/UISettings';

import {BasicButton, DoubleLineRow} from '../components/UIComponents';

export default function NLPExample() {
  const [text, setText] = useState(
    'Situated in Zhuhai, Beijing Normal University-Hong Kong Baptist University United International College (UIC) was jointly founded by Beijing Normal University and Hong Kong Baptist University. It is the first full-scale cooperation in higher education between the Chinese mainland and Hong Kong. UIC shoulders the historical mission of advancing the internationalization of Chinese higher education and taking the lead in implementing liberal arts education in China. ',
  );
  const [question, setQuestion] = useState('what is uic?');
  const {answer, metrics, isProcessing, processQA} = useNLPQAModelInference(
    NLPModels[0],
  );

  return (
    <ModelPreloader modelInfos={NLPModels}>
      <ScrollView style={styles.container}>
        <DoubleLineRow label="Source Text">
          <TextInput
            style={[PTLTextBoxStyle, {padding: 20}]}
            onChangeText={text => setText(text)}
            multiline={true}
            placeholder="Text"
            autoCorrect={false}
            value={text}
          />
        </DoubleLineRow>
        <DoubleLineRow label="Question">
          <View style={[PTLTextBoxStyle, styles.textActionOuter]}>
            <TextInput
              style={[PTLTextBoxStyle, {borderWidth: 0}]}
              onChangeText={question => setQuestion(question)}
              placeholder="Ask a question..."
              autoCorrect={false}
              value={question}
            />
            <BasicButton
              disabled={isProcessing}
              size="small"
              onPress={() => processQA(text, question)}>
              Ask
            </BasicButton>
          </View>
        </DoubleLineRow>
        <DoubleLineRow
          label="Answer"
          bold={true}
          style={!answer && !isProcessing && {opacity: 0}}>
          <Text style={styles.answer}>
            {isProcessing && <ActivityIndicator size="small" color="tomato" />}
            {answer}
          </Text>
          {answer != null && !isProcessing && (
            <Text style={styles.smallLabel}>
              Time taken: {metrics?.totalTime}ms (p={metrics?.packTime}/i=
              {metrics?.inferenceTime}/u={metrics?.unpackTime})
            </Text>
          )}
        </DoubleLineRow>
      </ScrollView>
    </ModelPreloader>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  textActionOuter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingRight: 10,
  },
  answer: {
    fontSize: 16,
    color: colors.accent2,
  },
  smallLabel: {
    fontSize: 12,
    color: colors.neutralBlack,
    fontFamily: 'Courier New',
  },
});
