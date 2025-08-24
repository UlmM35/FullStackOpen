import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import blogStore from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={blogStore}>
    <App />
  </Provider>,
);
