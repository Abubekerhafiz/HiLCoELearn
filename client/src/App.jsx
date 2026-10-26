
import { useMemo, useState } from "react";
import "./App.css";

const resources = [
  {
    id: 1,
    title: "Introduction to Database Systems",
    course: "Database Systems",
    code: "SE301",
    type: "PDF",
    color: "purple",
    author: "Abebe T.",
    date: "Oct 20, 2026",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    course: "Data Structures",
    code: "SE302",
    type: "PPT",
    color: "blue",
    author: "DR. nasrideen",
    date: "Oct 18, 2026",
  },
  {
    id: 3,
    title: "Operating Systems — Past Exam",
    course: "Operating Systems",
    code: "SE303",
    type: "PDF",
    color: "orange",
    author: "Dawit M.",
    date: "Oct 15, 2026",
  },
  {
    id: 4,
    title: "Software Engineering Lecture Notes",
    course: "Software Engineering",
    code: "SE304",
    type: "PDF",
    color: "green",
    author: "Sara H.",
    date: "Oct 12, 2026",
  },
];

const initialTasks = [
  { id: 1, title: "Review database normalization", done: false },
  { id: 2, title: "Prepare for the OS quiz", done: false },
  { id: 3, title: "Finish React practice", done: true },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase().trim();

    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(query) ||
        resource.course.toLowerCase().includes(query) ||
        resource.code.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" || resource.type === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        done: false,
      },
    ]);

    setNewTask("");
  }

  const completedTasks = tasks.filter((task) => task.done).length;

  return (
    <div className="app-shell">
      
<aside className="fixed inset-y-0 left-0 z-50 hidden w-[220px] flex-col bg-[#18253f] px-[15px] pt-[30px] pb-5 text-white md:flex min-[1101px]:w-[250px] min-[1101px]:px-5">
  <a
    className="mb-12 ml-[5px] flex items-center gap-3 text-white no-underline"
    href="#dashboard"
    onClick={() => setActivePage("Dashboard")}
  >
    <span className="grid size-[42px] shrink-0 place-items-center rounded-[13px] bg-[#7765f0] font-['Manrope',sans-serif] text-[23px] font-extrabold text-white">
      H
    </span>

    <span>
      <h1 className="font-['Manrope',sans-serif] text-base font-extrabold tracking-[-0.4px]">
        HilcoeLearn
      </h1>
      <small className="mt-[3px] block text-xs text-[#aab4cb]">
        Learn together.
      </small>
    </span>
  </a>

  <p className="mb-[13px] ml-3 text-[10px] font-bold tracking-[1.5px] text-[#8d9ab5]">
    WORKSPACE
  </p>

  <nav className="grid gap-2">
    {[
      ["Dashboard", "⌂"],
      ["Study Materials", "▤"],
      ["My Tasks", "✓"],
    ].map(([page, icon]) => (
      <button
        key={page}
        className={`flex w-full items-center gap-[13px] rounded-[10px] border-0 px-[14px] py-[13px] text-left text-[13px] transition-colors ${
          activePage === page
            ? "bg-[#6555d9] font-semibold text-white"
            : "bg-transparent text-[#bdc7da] hover:bg-[#263450] hover:text-white"
        }`}
        onClick={() => setActivePage(page)}
      >
        <span className="w-5 text-center text-[19px]">
          {icon}
        </span>
        {page}
      </button>
    ))}
  </nav>

  <div className="mt-auto">
    <div className="rounded-[13px] border border-[#34425c] bg-[#202e49] p-[17px]">
      <span className="mb-3 grid size-[30px] place-items-center rounded-[9px] bg-[#3d3b70] text-[#d0c9ff]">
        ✦
      </span>

      <strong className="block text-xs leading-[1.6]">
        Learning is better together.
      </strong>

      <p className="mt-[6px] text-[11px] leading-[1.7] text-[#aab5ca]">
        Share what you know. Discover what you need.
      </p>
    </div>

    <div className="mt-[22px] flex items-center gap-[11px] border-t border-[#34425c] px-[2px] pt-4">
      <div className="grid size-[37px] shrink-0 place-items-center rounded-full bg-[#e8e4ff] font-bold text-[#5543c7]">
        S
      </div>

      <div>
        <strong className="block text-xs">Student</strong>
        <small className="mt-1 block text-[10px] text-[#aab5ca]">
          HilcoeLearn member
        </small>
      </div>
    </div>
  </div>
</aside>


      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">H</span>
            <strong>HilcoeLearn</strong>
          </div>

          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>

          <div className="topbar-label">
            <span className="status-dot" />
            Your learning space
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" && (
            <>
              <section className="welcome-section">
                <div>
                  <p className="eyebrow">YOUR STUDY SPACE</p>
                  <h1>Make today count.</h1>
                  <p className="welcome-text">
                    Find your materials, organize your work, and keep moving
                    forward.
                  </p>
                </div>

                <div className="welcome-decoration" aria-hidden="true">
                  <span>✳</span>
                  <span>✦</span>
                  <span>✳</span>
                </div>
              </section>

              <section className="stats-grid">
                <article className="stat-card">
                  <span className="stat-icon purple-bg">▤</span>
                  <p>Study materials</p>
                  <strong>{resources.length}</strong>
                  <small>Sample resources</small>
                </article>

                <article className="stat-card">
                  <span className="stat-icon green-bg">✓</span>
                  <p>Tasks completed</p>
                  <strong>{completedTasks}/{tasks.length}</strong>
                  <small>Keep up the progress</small>
                </article>

                <article className="stat-card">
                  <span className="stat-icon orange-bg">⌕</span>
                  <p>Courses to explore</p>
                  <strong>
                    {new Set(resources.map((resource) => resource.course)).size}
                  </strong>
                  <small>Across your materials</small>
                </article>
              </section>

              <section className="content-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">YOUR LIBRARY</p>
                    <h2>Recently shared materials</h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("Study Materials")}
                  >
                    Browse all <span>→</span>
                  </button>
                </div>

                <ResourceLibrary
                  resources={filteredResources.slice(0, 3)}
                  search={search}
                  setSearch={setSearch}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              </section>

              <section className="content-section tasks-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">STAY ORGANIZED</p>
                    <h2>Your study tasks</h2>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => setActivePage("My Tasks")}
                  >
                    All tasks <span>→</span>
                  </button>
                </div>

                <TaskList
                  tasks={tasks.slice(0, 3)}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  addTask={addTask}
                  toggleTask={toggleTask}
                />
              </section>
            </>
          )}

          {activePage === "Study Materials" && (
            <section className="content-section page-section">
              <p className="eyebrow">LEARN FROM EACH OTHER</p>
              <h1>Study materials</h1>
              <p className="welcome-text">
                Search lecture notes, presentations, and past exams.
              </p>

              <ResourceLibrary
                resources={filteredResources}
                search={search}
                setSearch={setSearch}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </section>
          )}

          {activePage === "My Tasks" && (
            <section className="content-section page-section">
              <p className="eyebrow">ONE STEP AT A TIME</p>
              <h1>My study tasks</h1>
              <p className="welcome-text">
                Keep track of what you need to study next.
              </p>

              <TaskList
                tasks={tasks}
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
                toggleTask={toggleTask}
              />
            </section>
          )}

          <footer className="footer">
            <span>HilcoeLearn</span>
            <span>Built for students, one step at a time.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ResourceLibrary({
  resources,
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="library">
      <div className="library-toolbar">
        <label className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search title, course, code..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div className="category-filters">
          {["All", "PDF", "PPT"].map((category) => (
            <button
              key={category}
              className={`filter-chip ${
                activeCategory === category ? "selected" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="resource-grid">
        {resources.map((resource) => (
          <article className="resource-card" key={resource.id}>
            <div className={`file-illustration ${resource.color}`}>
              <span className="file-type">{resource.type}</span>
              <span className="file-symbol">▤</span>
            </div>

            <div className="resource-details">
              <span className="course-code">{resource.code}</span>
              <h3>{resource.title}</h3>
              <p>{resource.course}</p>

              <div className="resource-meta">
                <span>By {resource.author}</span>
                <span>{resource.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="empty-state">
          <span>⌕</span>
          <h3>No materials found</h3>
          <p>Try a different search term or file type.</p>
        </div>
      )}

      <p className="demo-notice">
        These are sample materials for the interface preview, not uploaded files.
      </p>
    </div>
  );
}

function TaskList({
  tasks,
  newTask,
  setNewTask,
  addTask,
  toggleTask,
}) {
  return (
    <div className="task-panel">
      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a study task..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          aria-label="New study task"
        />
        <button type="submit">+ Add task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <label className="task-row" key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.done ? "task-done" : ""}>
              {task.title}
            </span>
            <span className="task-status">
              {task.done ? "Completed" : "To do"}
            </span>
          </label>
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="empty-tasks">No tasks yet. Add your first study task!</p>
      )}
    </div>
  );
}

export default App;
