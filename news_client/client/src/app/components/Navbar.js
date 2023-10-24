
function Navbar() {
  return (
    <nav className="bg-white p-4 xl:block-500 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">The News</h1>
      </div>
      <div>
        <a href="#" className="mr-4 text-black font-bold">Home</a>
        <a href="#" className="mr-4 text-black font-bold">SignIn</a>
        <a href="#" className="text-black font-bold">SignUp</a>
      </div>
    </nav>
  );
}
export default Navbar;
