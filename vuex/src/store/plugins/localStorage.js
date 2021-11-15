export const localStoragePlugin = (store) => {
  console.log('Plugin was initialized');

  store.subscribe((mutation) => {
    console.log(mutation);
  });
}