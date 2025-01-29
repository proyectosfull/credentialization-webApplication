const commonFields = [
  {
    index: 1,
    name: 'index',
    label: 'Num.',
    sortable: false,
    align: 'right',
  },
  {
    index: 2,
    name: 'fullName',
    label: 'Nombre Completo',
    sortable: false,
  },
  {
    index: 5,
    name: 'phone',
    label: 'Teléfono',
    sortable: false,
  },
  {
    index: 6,
    name: 'email',
    label: 'Correo Electrónico',
    sortable: false,
  },
]

export const clients = [
  ...commonFields,
  {
    index: 0,
    name: 'index',
    align: 'right',
  },
  {
    index: 7,
    name: 'dateOfVenciment',
    label: 'Vencimiento de licencia',
  },
  {
    index: 8,
    name: 'license',
    label: 'Licencia',
  },
  {
    index: 9,
    name: 'users',
    label: 'Usuarios',
  },
]
export const users = [
  ...commonFields,
  {
    index: 3,
    name: 'dateOfBirth',
    label: 'Fecha de Nacimiento',
  },
  {
    index: 4,
    name: 'curp',
    label: 'CURP',
  },
  {
    index: 7,
    name: 'direction',
    label: 'Dirección',
  },
  {
    index: 8,
    name: 'department',
    label: 'Departamento',
    sortable: true,
  },
  {
    index: 9,
    name: 'identificacion',
    label: 'Identificación',
    align: 'center',
  },
]
