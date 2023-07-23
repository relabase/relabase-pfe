import { User_request } from '@/interfaces/user_requests.interface';

export const UserRequestsModel: User_request[] = [
  {
    id_user_request: 1,
    email: 'john.doe@example.com',
    access_reason:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec dui eu tortor fermentum fermentum. Mauris vel interdum dui. Nam eu nulla sit amet tellus interdum semper. In quis lorem in quam scelerisque consectetur. Etiam mollis quam at convallis interdum. Proin a nulla nec quam iaculis cursus. Vestibulum finibus metus sed tortor rhoncus consectetur. Integer rhoncus, velit vitae gravida ultrices, risus odio interdum dolor, nec auctor metus tellus non eros. Cras vel lectus eget orci dapibus sollicitudin. Fusce ac sapien in risus venenatis aliquam at ac purus. Donec sodales erat nisl, a suscipit quam varius sit amet.',
    is_approve: false,
    first_name: 'John',
    last_name: 'Doe',
    image: 'https://example.com/users/johndoe.jpg',
  },
  {
    id_user_request: 2,
    email: 'jane.smith@example.com',
    access_reason:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nulla a quam aliquam tempus a in lorem. Cras a efficitur purus. Nulla varius facilisis arcu a tempor. Vestibulum non libero ut est rutrum vulputate eu id turpis. Proin ac risus ac odio blandit varius. In congue odio ut mauris eleifend tincidunt. Nam aliquet posuere justo eu tincidunt. Vivamus non tincidunt velit. Donec sagittis ex nec magna tempus, nec tincidunt nisi sagittis. Integer vel fermentum purus. Nunc vel nisi in mi lacinia mattis. Nulla facilisi.',
    is_approve: false,
    first_name: 'Jane',
    last_name: 'Smith',
    image: 'https://example.com/users/janesmith.jpg',
  },
  {
    id_user_request: 3,
    email: 'michael.johnson@example.com',
    access_reason:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Nullam bibendum metus vitae tellus tincidunt tincidunt. Nulla facilisi. In luctus lorem vel velit elementum, vitae euismod neque eleifend. Cras ullamcorper euismod nunc, non sagittis dolor volutpat a. Donec in vestibulum elit, id elementum erat. Nulla facilisi. Sed ut luctus ligula. Aliquam in nisi at mi finibus viverra. Vivamus semper sapien vel blandit iaculis. Nam vehicula urna nec suscipit vulputate. Pellentesque eget dui a neque fermentum auctor in in nulla. Aenean bibendum velit eget leo venenatis, et tincidunt odio semper.',
    is_approve: false,
    first_name: 'Michael',
    last_name: 'Johnson',
    image: 'https://example.com/users/michaeljohnson.jpg',
  },
  {
    id_user_request: 4,
    email: 'susan.williams@example.com',
    access_reason:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sollicitudin ex ac nulla volutpat, eget cursus ipsum faucibus. Vestibulum tincidunt dictum fermentum. Cras aliquam purus ac odio porttitor pellentesque. Suspendisse eget consequat metus. Aenean eu lacinia nunc, in ullamcorper arcu. Vivamus nec ultrices mi. Nunc interdum, nunc a ultrices facilisis, nunc purus elementum ex, at facilisis elit massa nec sem. Etiam semper, magna ac sollicitudin blandit, urna odio tristique mi, nec elementum quam ligula ut felis. Suspendisse potenti. Donec malesuada in eros in congue. Sed vulputate, odio nec volutpat hendrerit, tellus lectus euismod nunc, at vestibulum lectus ex vel libero. Aliquam id gravida tortor. In hac habitasse platea dictumst.',
    is_approve: true,
    first_name: 'Susan',
    last_name: 'Williams',
    image: 'https://example.com/users/susanwilliams.jpg',
  },
  {
    id_user_request: 5,
    email: 'robert.jackson@example.com',
    access_reason:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius, felis at lacinia tristique, enim urna consequat mauris, sit amet ultricies odio nibh vitae dui. Etiam et orci a nisi suscipit facilisis quis ac justo. Curabitur bibendum massa eget bibendum aliquet. Curabitur semper venenatis lectus, ac fermentum lorem ultrices quis. Nulla ac felis ac arcu interdum tristique eget ut velit. Maecenas sed consectetur mauris. Donec volutpat quam a luctus venenatis. Etiam eu mauris diam. Aenean eu justo interdum, sodales arcu et, fermentum mi. Fusce auctor justo sit amet nisi efficitur, quis rhoncus turpis interdum. Suspendisse et lacinia eros. Vestibulum ac enim ac est dictum scelerisque in a enim. Etiam varius aliquet purus, id efficitur mauris iaculis sit amet.',
    is_approve: false,
    first_name: 'Robert',
    last_name: 'Jackson',
    image: 'https://example.com/users/robertjackson.jpg',
  },
];
