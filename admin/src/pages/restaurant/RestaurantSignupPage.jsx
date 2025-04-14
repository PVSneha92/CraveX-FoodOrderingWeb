import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const RestaurantSignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "image") formData.append(key, data[key]);
      });
      if (data.image?.[0]) formData.append("image", data.image[0]);

      const response = await axiosInstance.post(
        "/restaurant/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
      setTimeout(() => navigate("/restaurant/login"), 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="text-center mb-6">
          {imagePreview ? (
            <div className="mx-auto w-16 h-16 rounded-full overflow-hidden mb-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            Restaurant Sign Up
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Join our platform to start receiving orders
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Logo
            </label>
            <div className="flex items-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-white py-1.5 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Choose File
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                {...register("image")}
                onChange={handleImageChange}
              />
              <span className="ml-2 text-sm text-gray-500">
                {imagePreview ? "Selected" : "No file"}
              </span>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="e.g. Coasta"
                {...register("name", {
                  required: "Required",
                  minLength: { value: 3, message: "Too short" },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Email *
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="e.g. costa.support@gmail.com"
                {...register("email", {
                  required: "Required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.contactEmail ? "border-red-500" : "border-gray-300"
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="e.g. costa@gmail.com"
                {...register("contactEmail", {
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="e.g. 9446177319"
                {...register("phone", {
                  required: "Required",
                  pattern: { value: /^[0-9]{10}$/, message: "Invalid phone" },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Required",
                  minLength: { value: 8, message: "Too short" },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start pt-1">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                {...register("terms", { required: "Required" })}
              />
            </div>
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-orange-600 hover:text-orange-500">
                terms
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-xs text-red-600">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/restaurant/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignupPage;
