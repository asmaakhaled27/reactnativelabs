import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

const STORAGE_KEY = 'TODOS';

export default function TodoList() {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (e) {

      console.error("Failed to load todos from storage", e);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to storage", e);
    }
  };

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = data.todo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: data.todo, completed: false }]);
    }
    reset();
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    if (editIndex === index) {
      setEditIndex(null);
      reset();
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setValue('todo', todos[index].text);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleToggleComplete(index)}
      >
        <View style={[styles.checkboxBox, item.completed && styles.checkboxChecked]}>
          {item.completed && <Text style={styles.checkboxTick}>✓</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleToggleComplete(index)}>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(index)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(index)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          name="todo"
          rules={{ required: 'Todo cannot be empty' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter todo..."
              placeholderTextColor="#b39ddb"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.todo && <Text style={styles.error}>{errors.todo.message}</Text>}
        <TouchableOpacity style={styles.addBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.addBtnText}>{editIndex !== null ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 20,
    alignSelf: 'center',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7c43bd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#4a148c',
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: '#8e24aa',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#d500f9',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ce93d8',
  },
  completedTodo: {
    backgroundColor: '#d1c4e9',
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: '#4a148c',
  },
  completedText: {
    textDecorationLine: 'overline',
    color: '#b39ddb',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editBtn: {
    marginRight: 10,
    backgroundColor: '#7c43bd',
    padding: 6,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: '#d500f9',
    padding: 6,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#8e24aa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#b39ddb',
    borderColor: '#6a1b9a',
  },
  checkboxTick: {
    color: '#6a1b9a',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
