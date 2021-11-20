import Header from './components/Header/Header';

function App(props) {
  return (
    <div className='fullpage-contianer'>
      <div className="nav-container">
        <Header />
      </div>
      <div className="main-container">
        {props.children}
      </div>
    </div>
  );
}

export default App;
