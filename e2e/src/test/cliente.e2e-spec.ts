import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ClientePage } from '../page/cliente/cliente.po';
import { HomePage } from '../page/home/home.po';

describe('workspace-project Cliente', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let cliente:ClientePage;
    let home: HomePage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cliente = new ClientePage();
        home = new HomePage();
    });

    it('Deberia crear un cliente', () => {
        page.navigateTo();

        const NOMBRE = 'Sebastian';
        const APELLIDO = 'Jimenez';
        const EMAIL = 'sebastian' + Math.random() * (1000) + '@gmail.com';
        const FECHA_NACIMIENTO = '02-20-2021';

        navBar.clickBotonHome();
        const cantidadClientes = home.contarClientes();
        console.log(cantidadClientes);
        home.clickBotonCrearCliente();

        cliente.ingresarNombre(NOMBRE);
        cliente.ingresarApellido(APELLIDO);
        cliente.ingresarEmail(EMAIL);
        cliente.ingresarFechaNacimiento(FECHA_NACIMIENTO);
        cliente.clickBotonCrearClienteForm();
        expect(home.contarClientes()).toBeGreaterThan(cantidadClientes);
    });

    it('Deberia listar los clientes', () => {
        const cantidadClientesAntes = home.contarClientes();
        expect(cantidadClientesAntes).toBe(home.contarClientes());
        expect(cantidadClientesAntes).toBeGreaterThan(0);
    });
    
});