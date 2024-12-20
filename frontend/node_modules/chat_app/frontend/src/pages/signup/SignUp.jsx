import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs,setInputs] = useState({
		fullName:'',
		username:'',
		password:'',
		confirmpassword:'',
		gender:''
	})
	// useEffect(() => {
	//   console.log(inputs);
	// })
	
	const handleCheckboxChange = (gender) => {
		setInputs({...inputs,gender});
	}

	const {signup,loading} = useSignup();
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(inputs);
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-rose-600'> ChatApp </span>
				</h1>

				<form onSubmit={handleSubmit}> 
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							value={inputs.fullName}
							onChange={(e)=> setInputs({...inputs,fullName : e.target.value})}
						 	type='text' placeholder='Prashant Kumar' className='w-full input input-bordered placeholder:opacity-40  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							value={inputs.username}
							onChange={(e)=> setInputs({...inputs,username : e.target.value})}
						 type='text' placeholder='prashant022' className='w-full input input-bordered h-10 placeholder:opacity-40 ' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							value={inputs.password}
							onChange={(e)=> setInputs({...inputs,password : e.target.value})}
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							value={inputs.confirmpassword}
							onChange={(e)=> setInputs({...inputs,confirmpassword : e.target.value})}
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link to={'/login'} className='text-sm hover:underline hover:text-rose-800 mt-2 inline-block' href='#'>
						Already have an account? Login
					</Link>

					<div>
						<button
							disabled={loading}
						 	className='btn btn-block btn-sm mt-2 border border-slate-700'>
								{loading? <span className="loading loading-spinner"></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;