import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";

const LogIn = () => {
  const { signIn } = useAuthData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIN = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // signIN
    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Sign In Successfull",
          icon: "success",
          confirmButtonText: "Ok",
        });

        // clear form
        form.reset();

        // navigate
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Enter valid Email/Password",
          icon: "error",
          confirmButtonText: "opps",
        });
      });
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
            <form className="card-body" onSubmit={handleLogIN}>
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
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign In"
                />
              </div>
            </form>
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
