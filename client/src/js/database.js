import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });

export const putDb = async (content) => {
        console.error('putDb not implemented', content)
        const jateDB = await openDB('jate', 1);
        const tx = jateDB.transaction('jate', 'readwrite');
        const store = tx.objectStore('jate');
        const request = store.put({ id: 1, text: content });
        const result = await request;
        return result;
};

export const getDb = async () => {
  console.error('getDb not implemented')
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result;
};

initdb();
