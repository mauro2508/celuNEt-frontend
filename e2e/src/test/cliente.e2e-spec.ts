import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ClientePage } from '../page/cliente/cliente.po';

describe('workspace-project Cliente', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let cliente:ClientePage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cliente = new ClientePage();
    });

    it('Deberia crear un cliente', () => {
        page.navigateTo();

        const NOMBRE = 'Sebastian';
        const APELLIDO = 'Jimenez';
        const EMAIL = 'sebastian' + Math.random() * (1000) + '@gmail.com';
        const FECHA_NACIMIENTO = '02-20-2021';

        navBar.clickBotonHome();
        const cantidadClientes = cliente.contarClientes();
        console.log(cantidadClientes);
        cliente.clickBotonCrearCliente();

        cliente.ingresarNombre(NOMBRE);
        cliente.ingresarApellido(APELLIDO);
        cliente.ingresarEmail(EMAIL);
        cliente.ingresarFechaNacimiento(FECHA_NACIMIENTO);
        cliente.clickBotonCrearClienteForm();
        expect(cliente.contarClientes()).toBeGreaterThan(cantidadClientes);
    });

    it('Deberia listar los clientes', async () => {
        const cantidadClientesAntes = await cliente.contarClientes();
        expect(cantidadClientesAntes).toBe(cliente.contarClientes());
        expect(cantidadClientesAntes).toBeGreaterThan(0);
    });

    it('Deberia listar los clientes 2', () => {
        const cantidadClientesAntes = cliente.contarClientes();
        expect(cantidadClientesAntes).toBe(cliente.contarClientes());
        expect(cantidadClientesAntes).toBeGreaterThan(0);
    });
});