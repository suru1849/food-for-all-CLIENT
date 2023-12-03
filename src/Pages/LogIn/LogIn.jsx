import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { getToken, saveUser } from "../../api/auth";
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, googleSignIn } = useAuthData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIN = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // signIN
    try {
      // log in email and pass
      await signIn(email, password);

      // get token
      await getToken(email);

      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      // sing in with google
      const { user } = await googleSignIn();

      // get token
      await getToken(user?.email);

      // Save user
      await saveUser(user?.email, user);

      // navigaet
      navigate(location?.state ? location.state : "/");

      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Login</title>
      </Helmet>
      <div className="hero min-h-screen mb-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ml-32">
            <h1 className="text-5xl font-bold">Sign in Now!</h1>
            <p className="py-6">
              Sign in to explore &apos;Food For All&apos; and contribute to feed
              a poor person
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body mb-0" onSubmit={handleLogIN}>
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
                    label={"Login"}
                    loading={loading}
                  />
                </button>
              </div>
            </form>
            <div className="card-body -mt-10">
              <button onClick={handleGoogle} className="btn btn-outline w-full">
                Sign In with <FcGoogle></FcGoogle>
              </button>
            </div>
            <div className="text-center pb-5">
              New to this site?
              <Link className="text-red-600 font-bold" to="/register">
                {" "}
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default LogIn;
