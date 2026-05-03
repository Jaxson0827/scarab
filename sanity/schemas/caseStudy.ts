import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'client', type: 'string', title: 'Client / Company Name' }),
    defineField({
      name: 'industry',
      type: 'string',
      options: {
        list: [
          'construction',
          'manufacturing',
          'mining',
          'oil-gas',
          'utilities',
          'shipbuilding',
          'aerospace',
          'other',
        ],
      },
    }),
    defineField({ name: 'country', type: 'string' }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'challenge',
      type: 'text',
      title: 'The Challenge',
      description: 'What problem did the client face?',
    }),
    defineField({
      name: 'solution',
      type: 'text',
      title: 'The Solution',
      description: 'How did Traxon solve it?',
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      title: 'The Outcome',
      description: 'What were the measurable results?',
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Display Value (e.g. "40%")' }),
            defineField({ name: 'unit', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'quote', type: 'text' }),
        defineField({ name: 'name', type: 'string', title: 'Person Name' }),
        defineField({ name: 'title', type: 'string', title: 'Job Title' }),
        defineField({ name: 'company', type: 'string' }),
      ],
    }),
    defineField({
      name: 'productUsed',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'heroImage',
    },
  },
})
