import { useState } from 'react';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {};

	return (
		<div className="flex flex-col min-h-screen bg-[#F7F7F7]">
			<div className="flex justify-center items-center flex-1">
				<div className="bg-[#780502] p-8 rounded-lg shadow-xl w-full max-w-md">
					<h2 className="text-3xl text-white font-serif font-bold mb-6 text-center">
						Login
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="flex flex-col">
							<label htmlFor="username" className="text-white text-lg font-semibold mb-2">Username</label>
							<input
                                id="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="p-3 rounded-md border-none bg-white focus:outline-none focus:ring-0"
                                placeholder="Enter your username"
                                required
                            />
						</div>

						<div className="flex flex-col">
							<label htmlFor="password" className="text-white text-lg font-semibold mb-2">Password</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="p-3 rounded-md border-none bg-white focus:outline-none focus:ring-0"
								placeholder="Enter your password"
								required
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-white text-[#780502] font-bold py-2 px-4 rounded-md hover:bg-[#780502] hover:text-white transition-all duration-300"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
			
			{/* Footer section */}
			<div className="bg-[#780502] w-full h-20 fixed bottom-0 left-0 flex justify-center items-center">
				<span className="text-white text-sm font-bold">If you are a member, login to make changes to the site</span>
			</div>
		</div>
	);
}

export default Login;
