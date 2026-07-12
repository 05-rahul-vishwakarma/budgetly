import { TextInput, TextInputProps, View, ViewProps, Text, StyleSheet } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { ForwardedRef, forwardRef } from 'react';
import { colors } from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactElement<LucideProps>;
  rightIcon?: React.ReactElement<LucideProps>;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      leftElement,
      rightElement,
      containerClassName,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <View style={styles.container}>
        {label && (
          <Text
            id={`${inputId}-label`}
            style={styles.label}
          >
            {label}
          </Text>
        )}
        <View style={[
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
          props.disabled && styles.inputWrapperDisabled,
        ]}>
          {(leftIcon || leftElement) && (
            <View style={styles.iconContainer}>
              {leftElement || leftIcon}
            </View>
          )}
          <TextInput
            ref={ref}
            id={inputId}
            style={[styles.input, style]}
            {...props}
          />
          {(rightIcon || rightElement) && (
            <View style={styles.iconContainerRight}>
              {rightElement || rightIcon}
            </View>
          )}
        </View>
        {(error || helperText) && (
          <Text style={[
            styles.helperText,
            error ? styles.helperTextError : styles.helperTextMuted,
          ]}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.muted2,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputWrapperDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  iconContainerRight: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary.light,
    paddingHorizontal: 0,
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
  },
  helperTextError: {
    color: colors.error,
  },
  helperTextMuted: {
    color: colors.text.muted.light,
  },
});
