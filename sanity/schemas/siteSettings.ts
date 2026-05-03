import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string' }),
    defineField({ name: 'metaDescription', type: 'text' }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Default OG Image',
      options: { hotspot: true },
    }),
    defineField({ name: 'ctaPhoneNumber', type: 'string', title: 'CTA Phone Number' }),
    defineField({ name: 'ctaEmail', type: 'string', title: 'CTA Email' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn URL' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube URL' }),
        defineField({ name: 'instagram', type: 'url', title: 'Instagram URL' }),
      ],
    }),
    defineField({
      name: 'announcementBar',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', initialValue: false }),
        defineField({ name: 'message', type: 'string' }),
        defineField({ name: 'linkText', type: 'string' }),
        defineField({ name: 'linkUrl', type: 'string' }),
      ],
    }),
  ],
})
