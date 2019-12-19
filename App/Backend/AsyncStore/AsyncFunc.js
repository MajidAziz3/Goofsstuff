import AsyncStorage from '@react-native-community/async-storage';

export async function _storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
  }
}

export async function _storeMultipleData(array) {
  try {
    const value = await AsyncStorage.multiSet(array);
  } catch (error) {
  }
}

export async function _retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
  }
}

export async function _retrieveMultipleData() {
  var keys = [];
  var values = [];
  for (let i = 0; i < arguments.length; ++i) keys[i] = arguments[i];
  try {
    const value = await AsyncStorage.multiGet(keys);
    if (value !== null) {
      for (let i = 0; i < value.length; ++i) {
        values.push(value[i][1]);
      }
      return values;
    }
  } catch (error) {
  }
}

export async function _removeAll(keys) {
  try {
    const value = await AsyncStorage.multiRemove(_keys);
  } catch (error) {
  }
}
