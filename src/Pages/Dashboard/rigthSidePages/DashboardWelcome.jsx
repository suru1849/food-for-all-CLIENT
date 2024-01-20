import img from "../../../assets/admin.png";

const DashboardWelcome = () => {
  return (
    <div className="flex gap-5 flex-col justify-center items-center h-full">
      <figure>
        <img className="w-96 h-96" src={img} alt="admin" />
      </figure>
      <div className="text-3xl font-bold text-white">Welcome Admin</div>
    </div>
  );
};

export default DashboardWelcome;
