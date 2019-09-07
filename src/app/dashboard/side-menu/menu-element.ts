export const Menus = [
  {
    'name': 'Dashboard',
    'icon': 'dashboard',
    'link': false,
    'open': false,
    'chip': {'value': 1, 'color': 'accent'},
    'sub': [
      {
        'name': 'Hotel Table',
        'link': '/dashboard/hotel-table',
        'icon': 'dashboard',
        'chip': false,
        'open': true,
      },
      {
        'name': 'Branch Table',
        'link': '/dashboard/branch-table',
        'icon': 'dashboard',
        'chip': false,
        'open': true,
      },
      {
        'name': 'Role Table',
        'link': '/dashboard/role-table',
        'icon': 'dashboard',
        'chip': false,
        'open': true,
      },
      {
        'name': 'User Table',
        'link': '/dashboard/user-table',
        'icon': 'dashboard',
        'chip': false,
        'open': true,
      }
    ]
  },
  {
    'name': 'Admin',
    'icon': 'widgets',
    'link': false,
    'open': false,
    'chip': {'value': 17, 'color': 'accent'},
    'sub': [
      {
        'name': 'Branch',
        'link': '/dashboard/branch',
        'icon': 'indeterminate_check_box',
        'chip': false,
        'open': false,
      },
      {
        'name': 'Role',
        'link': '/dashboard/role',
        'icon': 'list',
        'chip': false,
        'open': false,
      },
      {
        'name': 'User',
        'link': '/dashboard/user',
        'icon': 'view_week',
        'chip': false,
        'open': false,

      }
    ]
  }
];
