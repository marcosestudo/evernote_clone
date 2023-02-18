import axios from "axios";
// todas as chamadas do axios começam com a baseUrl configurada aqui
const Api = axios.create({ baseURL: 'http://localhost:3001' }); // O app rodará na porta 3000, a api na 3001
export default Api;