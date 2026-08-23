import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/index.css'

export const App = () => {
    return (
        <Provider store={store}>
            <div>
                <span>app works!</span>
            </div>
        </Provider>
    )
}
