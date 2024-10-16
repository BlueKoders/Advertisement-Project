import React from 'react'

const UserSignup = () => {
  return (
    <div>
      {/*form Title*/}
      <h2>Login</h2>

      {/*signUP Form*/}
      <form>
        {/* name input*/}
        <div className=''>
          <label htmlFor="name">First Name</label>
          <input type="name" id="naame" placeholder="enter your first name here" className='' required />
        </div>


        <div className=''>
          <label htmlFor="name"> Last name</label>
          <input type="name" id="name" placeholder="enter your last name here" className='' required />
        </div>

        {/*Email Input*/}
        <div className=''>
          <label htmlFor="email"> email</label>
          <input type="email" id="email" placeholder="enter your email here" className='' required />
        </div>

        {/*password Input*/}
        <div className=''>
          <label htmlFor="password"> email</label>
          <input type="password" id="password" placeholder="enter your password here" className='' required />
        </div>

        {/*login form*/}
        <div>
          <label htmlFor="email"> email</label>
          <input type="email" id="email" placeholder="enter your email here" />
        </div>

        {/*Remember Me Checkbox*/}
        <div className=''>
          <label className=''> email
            <input type="checkbox" className='' />
            <span> Remember me</span>

          </label>
          <a href="#" className=''> Forgot Password?</a>

        </div>

        <div>
          <button type='submit' className=''>
            signUP

          </button>
        </div>

      </form>

        {/*Divider*/}
        <div className=''>
          <span className=''></span>
          <span className=''>OR</span>
          <span className=''></span>
        </div>

           {/*Social Login Buttons*/}
           <div>
            <button type='button' className=''> Sign up with Google</button>
           </div>

           {/*SIGN -UP link*/}
           <p className=''>Already have  an account?{""}
            <a href="#" className=''>
              <link to="./form"> login</link>/
            </a>
           </p>
    </div>

  );
};

export default UserSignup;