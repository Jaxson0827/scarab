import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
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
    defineField({ name: 'series', type: 'string' }),
    defineField({
      name: 'tier',
      type: 'string',
      options: { list: ['flagship', 'mid', 'entry'] },
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'specs',
      type: 'object',
      fields: [
        defineField({ name: 'payload', type: 'number', title: 'Max Payload (kg)' }),
        defineField({ name: 'width', type: 'number', title: 'Width (mm)' }),
        defineField({ name: 'weight', type: 'number', title: 'Machine Weight (kg)' }),
        defineField({ name: 'battery', type: 'number', title: 'Battery (Ah)' }),
        defineField({ name: 'speed', type: 'number', title: 'Speed (m/min)' }),
        defineField({ name: 'height', type: 'number', title: 'Load Height (mm)' }),
        defineField({ name: 'gradient', type: 'number', title: 'Max Gradient (%)' }),
        defineField({ name: 'hasWirelessRemote', type: 'boolean', title: 'Wireless Remote' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'model3dUrl', type: 'url', title: '3D Model URL (.glb)' }),
    defineField({ name: 'specSheetUrl', type: 'url', title: 'Spec Sheet PDF URL' }),
    defineField({
      name: 'trackColors',
      title: 'Available Track Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'hex', type: 'string', title: 'Hex Color' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'hotspots',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
            defineField({ name: 'x', type: 'number', title: 'X Position (%)' }),
            defineField({ name: 'y', type: 'number', title: 'Y Position (%)' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'competitors',
      title: 'Competitor Comparisons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Competitor Name' }),
            defineField({ name: 'payload', type: 'number' }),
            defineField({ name: 'width', type: 'number' }),
            defineField({ name: 'speed', type: 'number' }),
            defineField({ name: 'gradient', type: 'number' }),
            defineField({ name: 'price', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'accessories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'accessory' }] }],
    }),
    defineField({
      name: 'relatedCaseStudies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'specs.payload', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `${subtitle} kg` : '', media }
    },
  },
})
