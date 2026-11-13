
import { useMemo, useState, useEffect } from "react";
import {
  Home01Icon,
  BookOpen01Icon,
  Task01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./App.css";
import Auth from "./Auth";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState( () => window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem("hilcoelearn-theme");
 return savedTheme || "light";
  });

useEffect(() => {
  localStorage.setItem("hilcoelearn-theme", theme);
}, [theme]);

useEffect(() => {
  async function checkAuth() {
    console.log("Checking authentication...");
    const token = localStorage.getItem("hilcoelearn-token");

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Session expired");
      }

      const data = await response.json();

      setUser(data.user);
      setIsAuthenticated(true);

    } catch (error) {
      localStorage.removeItem("hilcoelearn-token");
      setUser(null);
      setIsAuthenticated(false);

    } finally {
      setIsCheckingAuth(false);
    }
  }

  checkAuth();
}, []);

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
  if (isCheckingAuth) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Checking your session...</p>
    </div>
  );
}

if (!isAuthenticated) {
  return (
    <Auth
      onSubmit={handleAuthSubmit}
      error={authError}
      loading={isLoading}
    />
  );
}
async function handleAuthSubmit(formData) {
  setAuthError("");
  setIsLoading(true);

  try {
    const endpoint = formData.isSignUp ? "register" : "login";

    // Send registration or login request
    const response = await fetch(
      `http://localhost:5000/api/users/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          formData.isSignUp
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }
            : {
                email: formData.email,
                password: formData.password,
              }
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Authentication failed");
    }

    let loginData = data;

    // Registration does not return a token,
    // so sign in automatically after registration.
    if (formData.isSignUp) {
      const loginResponse = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.message || "Account created, but login failed."
        );
      }
    }

    // Save the token
    localStorage.setItem("hilcoelearn-token", loginData.token);
    // Save the user's information
    setUser(loginData.user);

    // Show dashboard
    setIsAuthenticated(true);

  } catch (error) {
    setAuthError(error.message);
  } finally {
    setIsLoading(false);
  }
}
function handleLogout() {
  localStorage.removeItem("hilcoelearn-token");
  setUser(null);
  setIsAuthenticated(false);
  setAuthError("");
}
  return (
    <div className="app-shell" data-theme={theme}>
<aside
  className={`fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col
    bg-[var(--color-sidebar)] px-[15px] pt-[30px] pb-5
    text-[var(--color-text)] transition-transform duration-300
    md:flex min-[1101px]:w-[250px] min-[1101px]:px-5
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0`}
>
  <button
  type="button"
  onClick={() => setSidebarOpen(false)}
  aria-label="Close sidebar"
  className="mb-5 self-end rounded-lg px-3 py-2 text-xl text-[var(--color-text)] hover:bg-[var(--color-sidebar-hover)] md:hidden"
>
  ×
</button>
  <a
    className="mb-12 ml-[5px] flex items-center gap-3 text-[var(--color-text)]  no-underline"
    href="#dashboard"
    onClick={() => setActivePage("Dashboard")}
  >
   <span className="grid size-[42px] shrink-0 place-items-center rounded-[13px] bg-[var(--color-primary)] text-[23px] font-extrabold text-white">
    H
  </span>

    <span>
      <h1 className="font-['Manrope',sans-serif] text-base font-extrabold tracking-[-0.4px]">
        HilcoeLearn
      </h1>
      <small className="mt-[3px] block text-xs text-[var(--color-text-secondary)]">
        Learn together
      </small>
    </span>
  </a>

  <p className="mb-[13px] ml-3 text-[10px] font-bold tracking-[1.5px] text-[#8d9ab5]">
    WORKSPACE
  </p>

  <nav className="grid gap-2">
    {[
      ["Dashboard", Home01Icon],
      ["Study Materials", BookOpen01Icon],
      ["My Tasks", Task01Icon],
    ].map(([page, icon]) => (
      <button
        key={page}
        className={`flex w-full items-center gap-[13px] rounded-[10px] border-0 px-[14px] py-[13px] text-left text-[13px] transition-colors ${
          activePage === page
            ? "bg-[var(--color-primary)] font-semibold text-[var(--color-background)]"
            :"bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-text)]"
        }`}
        onClick={() => {
          setActivePage(page);

          if (window.innerWidth < 768) {
              setSidebarOpen(false);
                 }
}}
      >
        <span className="grid w-5 shrink-0 place-items-center">
        <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} />
        </span>
        {page}
      </button>
    ))}
  </nav>

  <div className="mt-auto">
    <div className="rounded-[13px] border border-[var(--color-border)] bg-[var(--color-sidebar-card)] p-[17px]">
      <span className="mb-3 grid size-[30px] place-items-center rounded-[9px] bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        ✦
      </span>

      <p className="mt-[6px] text-[11px] leading-[1.7] text-[var(--color-text)]">
        Share what you know. Discover what you need.
      </p>
    </div>

   <div className="mt-[22px] flex items-center gap-[11px] border-t border-[var(--color-border)] px-[2px] pt-4">
  <div className="grid size-[37px] shrink-0 place-items-center rounded-full bg-[var(--color-primary-light)] font-bold text-[var(--color-primary)]">
   {user?.name?.charAt(0).toUpperCase() || "S"}
  </div>
  <div>
    <strong className="block text-xs">
  {user?.name || "Student"}
</strong>
    <small className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">
      HilcoeLearn member
    </small>
   </div>
   </div>
   <button
  onClick={handleLogout}
  className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
>
  <span className="text-base">↪</span>
  <span>Sign out</span>
</button>
  </div>
</aside>
 {sidebarOpen && (
  <button
    type="button"
    aria-label="Close sidebar overlay"
    onClick={() => setSidebarOpen(false)}
    className="fixed inset-0 z-40 cursor-default bg-black/40 md:hidden"
  />
)}

      <main className="main-content">
        <header className="topbar">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
             className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xl text-[var(--color-text)] hover:bg-[var(--color-sidebar-hover)] md:hidden"
            >
             ☰
            </button>
          <div className="mobile-brand">
            <span className="brand-mark bg-[var(--color-primary)]">H</span>
            <strong>HilcoeLearn</strong>
          </div>

          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>

          <div className="topbar-label">
            <span className="status-dot" />
            Your learning space
          </div>
          <button
             type="button"
             className="theme-toggle"
            onClick={() =>
              setTheme((currentTheme) =>
             currentTheme === "light" ? "dark" : "light"
          )
        }
      >
            {theme === "light" ? " Dark mode" : " Light mode"}
      </button>
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
              <section className="about-section">
                <p>
              HilcoeLearn is a student-focused platform that makes learning more connected and collaborative. Students can
              share materials with one another and easily find resources by searching for a course, teacher, or student uploader.
              It also helps students organize their academic tasks and keep track of their study progress.
              </p>
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
