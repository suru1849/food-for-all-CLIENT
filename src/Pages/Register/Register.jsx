import { Link } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, profileUpdate } = useAuthData();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    if (password.length < 6) {
      return Swal.fire({
        title: "Error!",
        text: "Password must be atleast 6 character",
        icon: "error",
        confirmButtonText: "opps",
      });
    }

    // createUser
    createUser(email, password)
      .then(() =>
        // displayName and photoUrl setup
        profileUpdate(name, photoUrl)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Sign Up Successfull",
              icon: "success",
              confirmButtonText: "Ok",
            });

            // reset form
            form.reset();
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Submit valid Data",
              icon: "error",
              confirmButtonText: "opps",
            });
          })
      )
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Email already exits",
          icon: "error",
          confirmButtonText: "opps",
        });
      });
  };

  return (
    <>
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="photo url"
                  className="input input-bordered"
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
                  value="Sign Up"
                />
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
    </>
  );
};

export default Register;
