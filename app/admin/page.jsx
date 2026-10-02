import { redirect } from 'next/navigation';
import AdminDashboard from '../../src/AdminDashboard';
import { getProjects } from '../../src/lib/content';
import { getSession } from '../../src/lib/auth';
import { services, tools } from '../../src/data/portfolio';

export const metadata = { title: 'Admin Dashboard', robots: { index: false, follow: false } };

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  const projects = await getProjects();
  return <AdminDashboard username={session.username} initialCount={projects.length} serviceCount={services.length} toolCount={tools.length}/>;
}
