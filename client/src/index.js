import React from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux'

import store from './store'
import Routes from './routes'
import '../src/styles/index.scss'
import '../src/styles/global.css'
import '../src/styles/helpers.scss'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

const App = () => <Routes />

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
