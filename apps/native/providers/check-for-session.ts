import * as SecureStore from 'expo-secure-store';

// Check if session data exists in SecureStore and return boolean
const checkSecureStore = async (): Promise<boolean> => {
  try {
    const sessionData = await SecureStore.getItemAsync('lewi_session');
    return !!sessionData;
  } catch (error) {
    console.log('Error reading from SecureStore:', error);
    return false;
  }
};

export default checkSecureStore;