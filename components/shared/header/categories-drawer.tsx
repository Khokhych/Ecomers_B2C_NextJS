import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { getAllCategories } from '@/lib/actions/product.actions';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const CategoriesDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction='left'>
      <DrawerTrigger className={buttonVariants({ variant: 'outline' })}>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className='space-y-1'>
            {categories.map((x) => (
              <DrawerClose asChild key={x.category}>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'w-full justify-start'
                  )}
                  href={`/search?category=${x.category}`}
                >
                  {x.category} ({x._count})
                </Link>
              </DrawerClose>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoriesDrawer;