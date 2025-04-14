import { useNavigate } from "react-router-dom";

const RestaurantLanding = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/restaurant/login");
  };

  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 to-red-500 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Grow Your Restaurant <br />
            With CraveX
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of restaurants increasing their revenue and reaching
            more customers every day
          </p>
          <button
            onClick={handleLoginRedirect}
            className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started - It's Free
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Restaurants</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">5M+</div>
              <div className="text-gray-600">Monthly Orders</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">40%</div>
              <div className="text-gray-600">Average Revenue Growth</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides all the tools to help your restaurant thrive
            in the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Reach More Customers
            </h3>
            <p className="text-gray-600">
              Get discovered by thousands of hungry customers in your area
              searching for great food like yours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Boost Your Sales
            </h3>
            <p className="text-gray-600">
              Increase revenue with online orders and delivery without expanding
              your physical space.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572-1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573 1.066c-1.543-.94-3.31.826-2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572-1.065c-.426-1.756-2.924-1.756-3.35 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Powerful Dashboard
            </h3>
            <p className="text-gray-600">
              Manage orders, update menus, track performance - all from one
              intuitive interface.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Setup, Instant Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just a few easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 h-full w-0.5 bg-orange-200 md:block hidden"></div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute -left-10 top-8 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Create Your Account
                </h3>
                <p className="text-gray-600">
                  Sign up in minutes with basic information about your
                  restaurant. Our team will verify your details.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 h-full w-0.5 bg-orange-200 md:block hidden"></div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute -left-10 top-8 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Set Up Your Menu
                </h3>
                <p className="text-gray-600">
                  Upload your menu with photos, descriptions and pricing. Our
                  tools make it easy to manage.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute -left-10 top-8 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Start Receiving Orders
                </h3>
                <p className="text-gray-600">
                  Go live and begin accepting orders immediately. Our support
                  team is here to help 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Thousands of Successful Restaurants
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Sign up today and get your first 30 days free with no commitment
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleLoginRedirect}
              className="bg-white text-orange-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-50 transition duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Get Started Now
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about joining CraveX
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How much does it cost to join?
              </h3>
              <p className="text-gray-600">
                There's no upfront cost to join CraveX. We only take a small
                commission on orders processed through our platform. Your first
                30 days are completely free with no obligation.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How quickly can I start receiving orders?
              </h3>
              <p className="text-gray-600">
                Most restaurants are up and running within 24-48 hours after
                completing their profile and menu setup. Our team works quickly
                to verify your information and get you live.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do I need any special equipment?
              </h3>
              <p className="text-gray-600">
                No special equipment is required. You can manage everything from
                our web dashboard or mobile app. We'll provide a tablet if
                needed for order notifications.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What kind of support do you offer?
              </h3>
              <p className="text-gray-600">
                Our dedicated restaurant support team is available 24/7 via
                phone, email, and live chat. We also provide marketing materials
                and best practices to help you maximize your results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLanding;
