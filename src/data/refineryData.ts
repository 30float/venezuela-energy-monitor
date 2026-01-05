import type { Refinery } from '../types';

export const refineries: Refinery[] = [
  {
    id: 'paraguana',
    name: 'Paraguaná Refinery Complex',
    location: 'Falcón State',
    capacity: 940,
    currentOutput: 180,
    status: 'reduced',
    lastUpdated: '2025-01-03',
  },
  {
    id: 'el-palito',
    name: 'El Palito Refinery',
    location: 'Carabobo State',
    capacity: 140,
    currentOutput: 45,
    status: 'reduced',
    lastUpdated: '2025-01-03',
  },
  {
    id: 'puerto-la-cruz',
    name: 'Puerto La Cruz Refinery',
    location: 'Anzoátegui State',
    capacity: 200,
    currentOutput: 30,
    status: 'maintenance',
    lastUpdated: '2025-01-01',
  },
];
