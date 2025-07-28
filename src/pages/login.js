import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../store';

export default function Login() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) setUser(JSON.parse(data));
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      Alert.alert('Login Success!', JSON.stringify(data, null, 2));
      navigation.navigate("movielist");
    } catch (e) {
      Alert.alert("Error", "Failed to save user data");
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    reset();
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.username}!</Text>
        <Text style={styles.profileText}>Number of Favorite Films: {favorites.length}</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
          <Text style={styles.loginBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        name="username"
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username must be more than 2 characters' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#b39ddb"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 9, message: 'Password must be more than 8 characters' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter password"
              placeholderTextColor="#b39ddb"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          )}
        />
        <TouchableOpacity
          style={styles.showBtn}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showBtnText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#b39ddb"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^\d+$/,
            message: 'Phone number must be numeric',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#b39ddb"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 32,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#6a1b9a',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7c43bd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#4a148c',
    marginBottom: 4,
  },
  error: {
    color: '#d500f9',
    marginBottom: 4,
    marginLeft: 4,
  },
  loginBtn: {
    backgroundColor: '#8e24aa',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showBtn: {
    marginLeft: 8,
    backgroundColor: '#b39ddb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  showBtnText: {
    color: '#4a148c',
    fontWeight: 'bold',
  },
  profileText: {
    color: '#6a1b9a',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    alignSelf: 'center',
  },
}); 