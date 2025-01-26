import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-3xl my-16 p-8 rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
        Second Brain
      </h1>
      
      <div className="space-y-6">
        <p className="text-gray-600 text-lg mb-12">
          Organize your knowledge, boost your productivity, and never forget an idea again.
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform"
          >
            Get Started - It's Free
          </button>
          
          <button
            onClick={() => navigate('/signin')}
            className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Sign In
          </button>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-gray-500">
            Already have an account? 
            <button 
              onClick={() => navigate('/signin')}
              className="text-blue-600 hover:underline ml-2"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />
      </div>
    </div>
  );
}
