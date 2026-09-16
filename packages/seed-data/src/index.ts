import type { ClassState } from '@platform/publishing'
import type { TeamState } from '@platform/teams'

export const teamSeed: readonly TeamState[] = [
  {
    id: 'team-northwind',
    name: 'Northwind Studio',
    planCode: 'business-annual',
    members: [
      { id: 'member-ada', teamId: 'team-northwind', name: 'Ada Okafor', email: 'ada@northwind.example' },
      { id: 'member-bo', teamId: 'team-northwind', name: 'Bo Lindqvist', email: 'bo@northwind.example' },
      { id: 'member-cy', teamId: 'team-northwind', name: 'Cy Marchetti', email: 'cy@northwind.example' },
      { id: 'member-dee', teamId: 'team-northwind', name: 'Dee Alvarez', email: 'dee@northwind.example' },
    ],
  },
  {
    id: 'team-harbourlight',
    name: 'Harbourlight Collective',
    planCode: 'team-monthly',
    members: [
      { id: 'member-eli', teamId: 'team-harbourlight', name: 'Eli Novak', email: 'eli@harbourlight.example' },
      {
        id: 'member-fay',
        teamId: 'team-harbourlight',
        name: 'Fay Bergström',
        email: 'fay@harbourlight.example',
      },
    ],
  },
]

export const classSeed: readonly ClassState[] = [
  {
    id: 'class-watercolour',
    teacherId: 'teacher-imogen',
    title: 'Watercolour Landscapes in an Afternoon',
    status: 'draft',
    publishedAt: null,
  },
  {
    id: 'class-typography',
    teacherId: 'teacher-imogen',
    title: 'Typography for People Who Hate Typography',
    status: 'published',
    publishedAt: new Date('2026-06-11T09:00:00.000Z'),
  },
  {
    id: 'class-untitled',
    teacherId: 'teacher-rafael',
    title: '',
    status: 'draft',
    publishedAt: null,
  },
]
