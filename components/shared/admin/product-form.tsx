'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadButton } from '@/lib/uploadthing';
import { X } from 'lucide-react';

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(type === 'Update' ? updateProductSchema : insertProductSchema),
    defaultValues: product || productDefaultValues,
  });

  // Handle form submit
  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema | typeof updateProductSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const res = await createProduct(values);
      toast[res.success ? 'success' : 'error'](res.message);

    }
    if (type === 'Update') {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        router.push(`/admin/products`);
      }
    }
  };

  // Remove image
  const removeImage = (image: string) => {
    const images = form.getValues('images');
    form.setValue('images', images.filter((img: string) => img !== image));
  }

  // Remove banner
  const removeBanner = () => {
    form.setValue('banner', '');
  }

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='flex flex-col gap-5 md:flex-row'>
          <div className='flex flex-col gap-5 md:flex-row'>

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({
                field,
              }: {
                field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name='slug'
              render={({
                field,
              }: {
                field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='Enter product slug'
                        className='pl-8'
                        {...field}
                      />
                      {/* Generate Button */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-1 mt-2 hover:bg-gray-600'
              onClick={() => {
                form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
              }}
            >
              Generate
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <div className='flex flex-col gap-5 md:flex-row'>

            {/* Category */}
            <FormField
              control={form.control}
              name='category'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'category'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand */}
            <FormField
              control={form.control}
              name='brand'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'brand'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product brand' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <div className='flex flex-col gap-5 md:flex-row'>

            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'price'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product price' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name='stock'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'stock'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Enter product stock' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>
        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          {/* Images */}
        </div>
        <div className='upload-field'>{/* Is Featured */}</div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name='description'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'description'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* Image */}
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-16'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <div key={image} className="relative">
                          <X
                            onClick={() => removeImage(image)}
                            className="text-gray-900 absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer opacity-65 hover:opacity-100 transition-opacity"
                          />
                          <Image
                            src={image}
                            alt='product image'
                            className='w-20 h-20 object-cover object-center rounded-sm'
                            width={100}
                            height={100}
                          />
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'>
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2  '>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormLabel>Is Featured?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <div className="relative">
                  <X
                    onClick={() => removeBanner()}
                    className="text-gray-900 absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer opacity-65 hover:opacity-100 transition-opacity"
                  />
                  <Image
                    src={banner}
                    alt='banner image'
                    className=' w-full object-cover object-center rounded-sm'
                    width={1920}
                    height={680}
                  />
                </div>
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;