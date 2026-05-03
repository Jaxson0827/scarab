import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industry',
  title: 'Industry',
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
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconSvg',
      type: 'text',
      title: 'Icon SVG markup',
      description: 'Inline SVG string for the industry icon',
    }),
    defineField({
      name: 'challengeStatement',
      type: 'string',
      title: 'One-line Challenge Statement',
    }),
    defineField({
      name: 'challenges',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Key Challenges',
    }),
    defineField({
      name: 'solutions',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Traxon Solutions',
    }),
    defineField({
      name: 'recommendedProduct',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'caseStudies',
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
    select: { title: 'name', media: 'heroImage' },
  },
})
