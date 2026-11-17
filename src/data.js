export const initialProducts = [
  {
    id: '00085',
    name: 'Cimento',
    barcode: '7891000000850',
    brand: 'Gergal',
    entry: '2026-05-19',
    min: 5,
    stock: 10,
    expiry: '2027-05-19',
    price: 35,
    promo: 'NORMAL'
  },
  {
    id: '00194',
    name: 'Rejunte Quartzolit',
    barcode: '7891000000194',
    brand: 'Quartzolit',
    entry: '2026-04-19',
    min: 6,
    stock: 5,
    expiry: '2027-04-19',
    price: 10,
    promo: 'BAIXO'
  },
  {
    id: '02939',
    name: 'Areia Grossa',
    barcode: '7891000002939',
    brand: 'MR',
    entry: '2026-03-19',
    min: 3,
    stock: 3,
    expiry: '',
    price: 22,
    promo: 'NORMAL'
  }
];

export const initialClients = [
  {
    id: 1,
    name: 'Fulano de Tal da Silva',
    phone: '(83) 99999-0000',
    street: 'Rua das Flores',
    number: '85',
    complement: '',
    neighborhood: 'Centro',
    city: 'Campina Grande',
    zip: '58400-000',
    reference: ''
  },
  {
    id: 2,
    name: 'Fulano de Tal',
    phone: '(83) 98888-0000',
    street: 'Rua A',
    number: '194',
    complement: '',
    neighborhood: 'Prata',
    city: 'Campina Grande',
    zip: '58400-100',
    reference: ''
  }
];

export const initialQuotes = [
  {
    id: '0001',
    client: 'Fulano de Tal da Silva',
    total: 466,
    date: '2026-11-17',
    status: 'Aberto'
  },
  {
    id: '0002',
    client: 'Fulano de Tal',
    total: 250,
    date: '2026-11-16',
    status: 'Aberto'
  }
];
