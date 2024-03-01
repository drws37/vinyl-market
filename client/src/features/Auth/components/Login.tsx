import React from 'react'

function Login():JSX.Element {
  return (
    <div className="container">
 <div className="row">

 <div className="col-md-offset-3 col-md-6">
 <form className="form-horizontal" onSubmit={handleSubmit(registration)}>
 <span className="heading">Регистрация</span>
 <div className="form-group">
 <input type="email" className="form-control" placeholder="E-mail" {...register('email')}/>
 <i className="fa fa-user" />
 <span>{errors.email?.message}</span>
 </div>
 <div className="form-group">
 <input type="password" className="form-control" placeholder="Password" {...register('password')}/>
 <i className="fa fa-user" />
 <span>{errors.password?.message}</span>

 </div>
 <div className="form-group help">
 </div>
 <div className="form-group">
 <button type="submit" className="btn btn-default">ВХОД</button>
 </div>
 </form>
 <div className='errRega err'> {message}</div>
 </div>

 </div>
</div>
  )
}

export default Login