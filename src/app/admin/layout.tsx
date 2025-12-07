import { getCookie } from '@/services/Auth/tokenHandler';
import { verifyAccessToken } from '@/lib/jwtHandler';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const accessToken = await getCookie('accessToken');

  if (!accessToken) {
    redirect(`/login?redirect=/admin/dashboard`);
  }

  const verification = await verifyAccessToken(accessToken);

  if (!verification.success) {
    redirect(`/login?redirect=/admin/dashboard`);
  }

  const role = verification.payload?.role;

  if (role !== 'ADMIN') {
    // If user is not admin, redirect to their default dashboard
    redirect(getDefaultDashboardRoute(role));
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
