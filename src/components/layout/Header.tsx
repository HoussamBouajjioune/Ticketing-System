const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">MyLogo</div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded">Sign in</button>
          <button className="bg-green-500 text-white px-4 py-1 rounded">Sign up</button>
        </div>
      </div>
      <div className="container mx-auto flex gap-2 p-2">
        {["Rooms", "Mansion", "Countryside", "Villa", "Loft"].map((item) => (
          <span
            key={item}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer"
          >
            {item}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Header;
