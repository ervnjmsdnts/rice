import { View, Text, ScrollView, Keyboard } from "react-native";
import React from "react";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const KeyboardWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
