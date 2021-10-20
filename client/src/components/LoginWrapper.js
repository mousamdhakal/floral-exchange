const LoginWrapper = ({children}) => {
  return (
    <div className='login-wrapper'>
      <div className="login-container">
      {children}
      </div>
    </div>
  )
}

export default LoginWrapper
