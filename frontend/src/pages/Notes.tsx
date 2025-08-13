import Navbar from "../layouts/Navbar";

const Notes = () => {
  return (
    <div className="flex items-center justify-between h-screen bg-gray-100">
      <aside className="bg-slate-700 text-white w-64 h-full p-4">
        <nav className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <ul>
            <li className="mb-2">
              <a href="/">Home</a>
            </li>
            <li className="mb-2">
              <a href="/notes">Notes</a>
            </li>
            <li className="mb-2">
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="bg-gray-900 w-full h-full flex flex-col">
        <Navbar />
        <div className="flex flex-col !p-10 text-white">
          <h1 className="text-3xl font-bold mb-4">Notes Page</h1>
          <p className="text-lg">This is the Notes page.</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
