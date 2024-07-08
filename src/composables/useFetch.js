import {  ref } from 'vue';

const useFetch = async (url) => {
  const isLoading = ref(false);
  const hasError = ref(false);  
  const data = ref(null);
  let response = null;

  try {
   isLoading.value = true; 
   response = await fetch(url);
   data.value = await response.json();
   return data;
  } catch(error) {
    hasError.value = true;
    console.error(error);
  }
  isLoading.value = false;
  return { data, isLoading, hasError };
};

export default useFetch;