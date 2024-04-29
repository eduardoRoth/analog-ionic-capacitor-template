import { defineEventHandler } from 'h3';

export default defineEventHandler(() => (
  [
    {
      name: 'Ionic',
      icon: 'logo-ionic',
      color: 'primary'
    },
    {
      name: 'Capacitor',
      icon: 'logo-capacitor',
      color: 'secondary'
    },
    {
      name: 'Vite',
      icon: 'logo-vite',
    },
  ]
));
