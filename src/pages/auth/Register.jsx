import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const file = form.image.files[0];
    const bloodGroup = form.bloodGroup.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      return toast.error("Passwords do not match");
    }

    let imageUrl = "";
    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = res.data.data.display_url;
      }

      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl,
      });

      
      const userData = { name, email, bloodGroup, avatar: imageUrl };
      await axios.post("http://localhost:3000/users", userData);

      toast.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Avatar</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn btn-primary w-full mt-2">Register</button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
