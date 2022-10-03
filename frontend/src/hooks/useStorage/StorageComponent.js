import { useLocalStorage } from './useStorage';

export default function StorageComponent() {
  const [id, setId, removeId] = useLocalStorage('id', 'az');
  const [token, setToken, removeToken] = useLocalStorage('token', '45');

  return (
    <div>
      <div>{{ id } - { token }}</div>
      <button onClick={() => setId('John')}>Set id</button>
      <button onClick={() => setToken('40')}>Set token</button>
      <button onClick={removeId}>Remove id</button>
      <button onClick={removeToken}>Remove token</button>
    </div>
  );
}
