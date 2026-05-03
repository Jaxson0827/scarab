import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dealer',
  title: 'Dealer',
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
    defineField({
      name: 'logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'country', type: 'string' }),
    defineField({ name: 'state', type: 'string', title: 'State / Province' }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'lat', type: 'number', title: 'Latitude' }),
    defineField({ name: 'lng', type: 'number', title: 'Longitude' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'website', type: 'url' }),
    defineField({
      name: 'types',
      type: 'object',
      title: 'Dealer Types',
      fields: [
        defineField({ name: 'isDistributor', type: 'boolean', title: 'Distributor', initialValue: false }),
        defineField({ name: 'isService', type: 'boolean', title: 'Service Center', initialValue: false }),
        defineField({ name: 'isRental', type: 'boolean', title: 'Rental', initialValue: false }),
      ],
    }),
    defineField({
      name: 'products',
      title: 'Authorized Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || '', media }
    },
  },
})
