import { useRef, type ReactNode, type RefObject } from 'react';
type Section = 'projects' | 'about' | 'contact';
const folders: { id: Section; label: string; previews: string[] }[] = [
 { id: 'projects', label: 'Projects', previews: ['Job Tracker', 'Spotify Rewind', 'KPI Dashboard'] },
 { id: 'about', label: 'About', previews: ['AboutMe.txt', 'PLNU · 2026', 'San Diego'] },
 { id: 'contact', label: 'Contact', previews: ['GitHub', 'Email', 'Say hello'] },
];
const projects = [
 { title: 'Job Tracker API', stack: 'Python / FastAPI / PostgreSQL', description: 'A REST API for managing job applications, with JWT authentication, registration, and per-user access control.', url: 'https://github.com/jb-pryor/job-tracker-api' },
 { title: 'Spotify Rewind', stack: 'Next.js / React / TypeScript', description: 'Personalized listening insights using the Spotify Web API, OAuth, and reusable React components.', url: 'https://github.com/jb-pryor' },
 { title: 'KPI Dashboard', stack: 'Angular / Tailwind / Google Sheets API', description: 'A dashboard built for PLNU’s Director of Institutional Research to explore departmental metrics and multi-year trends.', url: 'https://github.com/jb-pryor' },
];
function Folder({ label, previews, onOpen }: { label: string; previews: string[]; onOpen: () => void }) {
 return <button className="folder" onClick={onOpen} aria-haspopup="dialog" aria-label={`Open ${label}`}>
  {previews.map(text => <span key={text} className="preview" aria-hidden="true">{text}</span>)}
  <span className="folder-art" aria-hidden="true"/><span className="folder-label">{label}</span>
 </button>;
}
function DesktopWindow({ id, title, children, dialogRef }: { id: Section; title: string; children: ReactNode; dialogRef: RefObject<HTMLDialogElement | null> }) {
 return <dialog ref={dialogRef} aria-labelledby={`${id}-title`} onClick={event => {
  const b = event.currentTarget.getBoundingClientRect();
  if (event.target === event.currentTarget && (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom)) event.currentTarget.close();
 }}><header className="window-bar"><button className="close" aria-label={`Close ${title}`} onClick={() => dialogRef.current?.close()}>×</button><h2 id={`${id}-title`}>{title}</h2></header><div className="window-body">{children}</div></dialog>;
}
export default function App() {
 const projectsRef = useRef<HTMLDialogElement>(null);
 const aboutRef = useRef<HTMLDialogElement>(null);
 const contactRef = useRef<HTMLDialogElement>(null);
 const windows = { projects: projectsRef, about: aboutRef, contact: contactRef };
 const open = (id: Section) => windows[id].current?.showModal();
 return <>
  <header className="menu-bar"><strong>JB / Portfolio</strong><span>San Diego, CA</span></header>
  <main className="desktop"><section className="intro"><span className="eyebrow">A little space on the internet</span><h1>Hi, I’m James Pryor.</h1><p>Software developer · Curious builder</p><span className="status">Open to software engineering opportunities</span></section>
  <nav className="folders" aria-label="Portfolio folders">{folders.map(folder => <Folder key={folder.id} label={folder.label} previews={folder.previews} onOpen={() => open(folder.id)}/>)}</nav><p className="hint">Hover to peek. Click to explore.</p></main>
  <nav className="dock" aria-label="Quick navigation">{folders.map(folder => <button key={folder.id} onClick={() => open(folder.id)}>{folder.label}</button>)}</nav>
  <DesktopWindow id="projects" title="Projects" dialogRef={projectsRef}>{projects.map(project => <article className="project" key={project.title}><div className="thumbnail">{project.title}</div><div><h3>{project.title}</h3><span className="stack">{project.stack}</span><p>{project.description}</p><a className="link" href={project.url} target="_blank" rel="noopener noreferrer">{project.url.endsWith('jb-pryor') ? 'Browse GitHub' : 'View source'} ↗</a></div></article>)}</DesktopWindow>
  <DesktopWindow id="about" title="AboutMe.txt" dialogRef={aboutRef}><h3 className="about-title">A bit about me.</h3><p>I’m James (JB), a software developer based in San Diego. I graduated from Point Loma Nazarene University in May 2026 with a B.S. in Computer Science: Software Engineering.</p><p>I build web applications and developer tools using React, TypeScript, Python, and C++. My recent work includes a job-tracking API, personalized Spotify analytics, and a client dashboard for PLNU.</p><p>I’m looking for a software engineering role where I can contribute, keep learning, and work with a good team.</p></DesktopWindow>
  <DesktopWindow id="contact" title="Contact" dialogRef={contactRef}><h3>Let’s connect.</h3><p>Have an opportunity or want to talk about a project?</p><div className="grid gap-3">{[['GitHub','https://github.com/jb-pryor'],['Email','mailto:jpryor35@icloud.com'],['Current portfolio','https://jbpryor.com']].map(([label,url]) => <a key={label} href={url} target={url.startsWith('https') ? '_blank' : undefined} rel="noopener noreferrer" className="rounded-lg border border-white/20 p-4 text-white no-underline transition-colors hover:bg-white/10">{label} ↗</a>)}</div><p className="note">Add your LinkedIn URL and resume PDF links here.</p></DesktopWindow>
 </>;
}
