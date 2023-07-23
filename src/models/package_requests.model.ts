import { Package_request } from '@/interfaces/package_requests.interface';

export const PackageRequestModel: Package_request[] = [
  {
    id_package_request: 1,
    name_package: 'Sample Package 1',
    reason: 'Testing purposes',
    is_approve: true,
    id_user: 2,
    link: 'https://example.com/package1',
  },
  {
    id_package_request: 2,
    name_package: 'Sample Package 2',
    reason: 'Development testing',
    is_approve: false,
    id_user: 3,
    link: 'https://example.com/package2',
  },
  {
    id_package_request: 3,
    name_package: 'Sample Package 3',
    reason: 'Demo request',
    is_approve: true,
    id_user: 4,
    link: 'https://example.com/package3',
  },
  {
    id_package_request: 4,
    name_package: 'Sample Package 4',
    reason: 'Evaluation',
    is_approve: true,
    id_user: 4,
    link: 'https://example.com/package4',
  },
  {
    id_package_request: 5,
    name_package: 'Sample Package 5',
    reason: 'Research and analysis',
    is_approve: false,
    id_user: 3,
    link: 'https://example.com/package5',
  },
];
