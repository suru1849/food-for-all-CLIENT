import { Link, useNavigate } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { imageUpload } from "../../api/utils";
import { toast } from "react-hot-toast";
import { getToken, saveUser } from "../../api/auth";
import { ImSpinner9 } from "react-icons/im";
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { createUser, profileUpdate } = useAuthData();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.image.files[0];

    if (password.length < 6) {
      return Swal.fire({
        title: "Error!",
        text: "Password must be atleast 6 character",
        icon: "error",
        confirmButtonText: "opps",
      });
    }

    try {
      // upload profile pic in imgBB
      const imageUrl = await imageUpload(photoUrl);

      // create user
      const { user } = await createUser(email, password);

      // profile update
      await profileUpdate(name, imageUrl?.data?.display_url);

      // save user in data base
      await saveUser(email, user);

      // get Token
      await getToken(email);

      toast.success("Registration Successful");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Register</title>
      </Helmet>
      <div className="hero min-h-screen mb-10">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left lg:mr-32">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Sign up to explore &apos;Food For All&apos; and contribute to feed
              a poor person
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  <LoaderBtn
                    icon={ImSpinner9}
                    label={"Register"}
                    loading={loading}
                  />
                </button>
              </div>
            </form>
            <div className="text-center pb-5">
              Already have an account?
              <Link className="text-red-600 font-bold" to="/login">
                {" "}
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Register;
