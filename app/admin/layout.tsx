import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import AdminSearch from '@/components/shared/admin/admin-search';
import { MainNav } from './main-nav';
import { requireAdmin } from '@/lib/auth-guard';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <>
      <div className="flex h-screen flex-col">
          <header className="w-full border-b">
            <div className="wrapper flex-between">
              <div className="flex-start">
                <Link href="/" className="flex-start">
                  <Image
                    src="/images/logo.svg"
                    alt={`${APP_NAME} Logo`}
                    width={40}
                    height={40}
                  />
                  <span className='hidden lg:block font-bold text-2xl ml-3'>
                    {APP_NAME}
                  </span>
                </Link>
              </div>
              <MainNav className='mx-6' />
              <div className='ml-auto flex items-center space-x-4'>
                <AdminSearch />
                <Menu />
              </div>
            </div>
          </header>
          <main className="wrapper flex-1">
            <div className='my-10 w-full'>
              {children}
            </div>
          </main>
        {/* </div> */}
      </div>
    </>
  );
}