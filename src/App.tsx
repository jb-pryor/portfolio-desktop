import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

/* =========================
   Types
   ========================= */

// Only these three names can be used to open a window.
type Section = "projects" | "about" | "contact";

type FolderData = {
  id: Section;
  label: string;
  previews: string[];
};

type FolderProps = {
  label: string;
  previews: string[];
  onOpen: () => void;
};

type DesktopWindowProps = {
  id: Section;
  title: string;
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

/* =========================
   Folder data
   ========================= */

const folders: FolderData[] = [
  {
    id: "projects",
    label: "Projects",
    previews: [
      "Job Tracker",
      "Spotify Rewind",
      "KPI Dashboard",
    ],
  },
  {
    id: "about",
    label: "About",
    previews: [
      "AboutMe.txt",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    previews: [
      "GitHub",
      "Linkedin",
      "Email"
    ],
  },
];

/* =========================
   Project data
   ========================= */

const projects = [
  {
    title: "Job Tracker API",
    stack: "Python / FastAPI / PostgreSQL",
    description:
      "A REST API for managing job applications, with JWT authentication, registration, and per-user access control.",
    url: "https://github.com/jb-pryor/job-tracker-api",
    image: "/projects/jobtracker.png",
    demoUrl: "https://spotify-wrap-clone.vercel.app",
  },
  {
    title: "Spotify Rewind",
    stack: "Next.js / React / TypeScript",
    description:
      "Personalized listening insights using the Spotify Web API, OAuth, and reusable React components.",
    url: "https://github.com/jb-pryor",
    image: "/projects/spotify.png",
    demoUrl: "https://spotify-wrap-clone.vercel.app",
  },
  {
    title: "KPI Dashboard",
    stack: "Angular / Tailwind / Google Sheets API",
    description:
      "A dashboard built for PLNU’s Director of Institutional Research to explore departmental metrics and multi-year trends.",
    url: "https://github.com/jb-pryor",
    image: "/projects/proj1.png",
    demoUrl: "",
  },
];

/* =========================
   Contact data
   ========================= */

   const contactLinks = [
    {
      label: "GitHub",
      url: "https://github.com/jb-pryor",
      icon: "GitHub",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/james-pryor-571b3a2ab/",
      icon: "LinkedIn",
    },
    {
      label: "Resume",
      url: "/resume.pdf",
      icon: "Resume",
    },
    {
      label: "Email",
      url: "mailto:jpryor35@icloud.com",
      icon: "Email",
    },
  ];

function ContactPreviewIcon({ name }: { name: string }) {
  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .297a12 12 0 0 0-3.793 23.385c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297Z"
        />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* =========================
   Folder component
   ========================= */

   function Folder({
    label,
    previews,
    onOpen,
  }: FolderProps) {
    const isContact = label === "Contact";
  
    return (
      <button
        className="folder"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open ${label}`}
      >
        {previews.map((text, index) => (
          <span
            key={text}
            className={
              isContact
                ? "preview preview-contact"
                : label === "Projects"
                  ? "preview preview-project"
                  : "preview"
            }
            aria-hidden="true"
          >
            {isContact ? (
              <ContactPreviewIcon name={text} />
            ) : label === "Projects" && projects[index] ? (
              <img
                src={projects[index].image}
                alt=""
              />
            ) : (
              text
            )}
          </span>
        ))}
  
        <span
          className="folder-art"
          aria-hidden="true"
        />
  
        <span className="folder-label">
          {label}
        </span>
      </button>
    );
  }

/* =========================
   Desktop window component
   ========================= */

function DesktopWindow({
  id,
  title,
  children,
  dialogRef,
}: DesktopWindowProps) {
  // Close the window when a click lands outside its bounds.
  function handleOutsideClick(
    event: MouseEvent<HTMLDialogElement>,
  ) {
    const dialog = event.currentTarget;
    const bounds = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (
      event.target === dialog &&
      clickedOutside
    ) {
      dialog.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onClick={handleOutsideClick}
    >
      {/* Window title bar and close button. */}
      <header className="window-bar">
        <button
          className="close"
          aria-label={`Close ${title}`}
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>

        <h2 id={`${id}-title`}>
          {title}
        </h2>
      </header>

      {/* Content passed between the component's opening and closing tags. */}
      <div className="window-body">
        {children}
      </div>
    </dialog>
  );
}
   
/* =========================
   Desktop status bar
   ========================= */

   function DesktopStatus() {
    const [now, setNow] = useState(() => new Date());
  
    // Update the clock, and clean up when the component unmounts.
    useEffect(() => {
      const timer = window.setInterval(() => {
        setNow(new Date());
      }, 1000);
  
      return () => window.clearInterval(timer);
    }, []);
  
    // Uses the visitor's local time zone.
    const date = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  
    return (
      <div className="desktop-status">
        {/* Decorative battery icon — not the visitor's actual battery. */}
        <span
          className="status-icon"
          title="Decorative battery indicator"
        >
          <svg
            width="29"
            height="18"
            viewBox="0 0 29 18"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="3"
              width="23"
              height="12"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
  
            <rect
              x="3.5"
              y="5.5"
              width="16"
              height="7"
              rx="1"
              fill="currentColor"
            />
  
            <path
              d="M26 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
  
        {/* Decorative Wi-Fi icon. */}
        <span
          className="status-icon"
          title="Decorative Wi-Fi indicator"
        >
          <svg
            width="22"
            height="18"
            viewBox="0 0 24 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 5C7.5 0.5 16.5 0.5 22 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M5.5 9C9 6 15 6 18.5 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M9 13C10.8 11.5 13.2 11.5 15 13"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <circle
              cx="12"
              cy="17"
              r="1.5"
              fill="currentColor"
            />
          </svg>
        </span>
  
        {/* Actual date and time. */}
        <time
          className="desktop-clock"
          dateTime={now.toISOString()}
        >
          <span className="desktop-date">{date}</span>
          <span>{time}</span>
        </time>
      </div>
    );
  }

  function ContactLinkIcon({ name }: { name: string }) {
    if (name === "Resume") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 17v4h16v-4" />
        </svg>
      );
    }
  
    return <ContactPreviewIcon name={name} />;
  }

  /* =========================
   Main application
   ========================= */

export default function App() {
  // Each ref gives us access to a dialog element.
  const projectsRef = useRef<HTMLDialogElement>(null);
  const aboutRef = useRef<HTMLDialogElement>(null);
  const contactRef = useRef<HTMLDialogElement>(null);

  // Match each section name with its dialog ref.
  const windows = {
    projects: projectsRef,
    about: aboutRef,
    contact: contactRef,
  };

  function openWindow(id: Section) {
    windows[id].current?.showModal();
  }

  return (
    <>
      {/* =========================
          Top menu bar
          ========================= */}

      <header className="menu-bar">
        <strong>JB / Portfolio</strong>

        <DesktopStatus />
      </header>

      {/* =========================
          Desktop
          ========================= */}

      <main className="desktop">
        <section className="intro">
          <h1>Hi, I’m James Pryor.</h1>

          <p>Software developer</p>

          {/* Contact folder centered underneath the introduction. */}
          <div className="intro-contact">
            <Folder
              label="Contact"
              previews={["GitHub", "LinkedIn", "Email"]}
              onOpen={() => openWindow("contact")}
            />
          </div>
        </section>

        {/* Only Projects and About remain on the right. */}
        <nav
          className="folders"
          aria-label="Projects and about folders"
        >
          {folders
            .filter((folder) => folder.id !== "contact")
            .map((folder) => (
              <Folder
                key={folder.id}
                label={folder.label}
                previews={folder.previews}
                onOpen={() => openWindow(folder.id)}
              />
            ))}
        </nav>
      </main>

      {/* =========================
          Bottom dock
          ========================= */}

      <nav
        className="dock"
        aria-label="Quick navigation"
      >
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => openWindow(folder.id)}
          >
            {folder.label}
          </button>
        ))}
      </nav>

      {/* =========================
          Projects window
          ========================= */}

      <DesktopWindow
        id="projects"
        title="Projects"
        dialogRef={projectsRef}
      >
        {projects.map((project) => (
          <article
            className="project"
            key={project.title}
          >
            {project.demoUrl ? (
              <a
                className="project-demo"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                />

                <span className="project-demo-overlay" aria-hidden="true">
                  <span>Live demo ↗</span>
                </span>
              </a>
            ) : (
              <div className="project-demo">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                />
              </div>
            )}

            <div>
              <h3>{project.title}</h3>

              <span className="stack">
                {project.stack}
              </span>

              <p>{project.description}</p>

              <a
                className="link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.url.endsWith("jb-pryor")
                  ? "Browse GitHub"
                  : "View source"}
                {" "}↗
              </a>
            </div>
          </article>
        ))}
      </DesktopWindow>

      {/* =========================
          About window
          ========================= */}

      <DesktopWindow
        id="about"
        title="AboutMe.txt"
        dialogRef={aboutRef}
      >
        <h3 className="about-title">
          A bit about me.
        </h3>

        <p className="about-p">
          I’m James (JB), a software developer based in
          San Diego. I graduated from Point Loma Nazarene
          University in May 2026 with a B.S. in Computer
          Science: Software Engineering.
        </p>

        <p className="about-p">
          I build web applications and developer tools
          using React, TypeScript, Python, and C++. My
          recent work includes a job-tracking API,
          personalized Spotify analytics, and a client
          dashboard for PLNU.
        </p>

        <p className="about-p">
          I’m looking for a software engineering role
          where I can contribute, keep learning, and
          work with a good team.
        </p>
      </DesktopWindow>

      {/* =========================
          Contact window
          ========================= */}

      <DesktopWindow
        id="contact"
        title="Contact"
        dialogRef={contactRef}
      >
        <div className="contact-layout">
          {/* Left column: portrait and personal details. */}
          <div className="contact-profile">
            <img
              className="contact-photo"
              src="/profile.jpg"
              alt="James Pryor"
            />

            <h3 className="contact-name">
              James Benjamin Pryor
            </h3>

            <p className="contact-nickname">(JB)</p>

            <p className="contact-location">
              San Diego, CA
            </p>
          </div>

          {/* Right column: links and icons. */}
          <div className="contact-details">
            <h3 className="contact-heading">
              My Links:
            </h3>

            <nav
              className="contact-menu"
              aria-label="Contact links"
            >
              {contactLinks.map(({ label, url, icon }) => (
                <a
                  key={label}
                  className="contact-menu-link"
                  href={url}
                  target={
                    url.startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                >
                  <span className="contact-menu-icon">
                    <ContactLinkIcon name={icon} />
                  </span>

                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </DesktopWindow>
    </>
  );
}