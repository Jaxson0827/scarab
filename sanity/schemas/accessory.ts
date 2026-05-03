import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'shortDescription', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['lifting', 'safety', 'power', 'attachment', 'transport', 'other'],
      },
    }),
    defineField({ name: 'sku', type: 'string', title: 'SKU' }),
    defineField({ name: 'leadTimeDays', type: 'number', title: 'Lead Time (days)' }),
    defineField({
      name: 'compatibleWith',
      title: 'Compatible Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
})
