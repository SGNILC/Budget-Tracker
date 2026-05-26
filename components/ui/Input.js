import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors, fontSizes, spacing } from "../../constants/themes";

const Input = forwardRef(function Input(props, ref) {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.gray}
      {...props}
    />
  );
});

export default Input;

const styles = StyleSheet.create({
  input: {
    // Matches the light mint background in your UI design
    backgroundColor: colors.inputBackground, 
    // High rounding (15px) for the modern "bubble" look
    borderRadius: 15, 
    color: colors.black,
    // Increased padding to match the "spacious" look of the design
    padding: 18, 
    fontSize: fontSizes.regular,
    // Standard gap between form elements
    marginBottom: spacing.sm, 
    // Ensuring the text sits nicely inside the rounded container
    width: '100%',
  },
});