import simpleRestProvider from 'ra-data-simple-rest';
export default simpleRestProvider(import.meta.env.VITE_API_URL || 'http://localhost:4000');