import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { DetalleClientePage } from '../page/detalle-cliente/detalle-cliente.po';
import { HomePage } from '../page/home/home.po';
import { CompraPage } from '../page/compra/compra.po';

describe('workspace-project Cliente', () =>{
    let page: AppPage;
    let navbar: NavbarPage;
    let detalleCliente: DetalleClientePage;
    let home: HomePage;
    let compra: CompraPage;

    beforeEach( () => {
        page = new AppPage();
        navbar = new NavbarPage();
        detalleCliente = new DetalleClientePage();
        home = new HomePage();
        compra = new CompraPage();
    });

    it('Deberia crear una compra desde detalle cliente', () =>{
        page.navigateTo();
        navbar.clickBotonHome();
        home.clickImagenPrimerCliente();

        const listaComprasClienteAntes = detalleCliente.contarListaCompras();

        detalleCliente.clickBotonCrearCompra();

        const DESCRIPCION = 'Compra e2e';
        compra.ingresarDescripcion(DESCRIPCION);
        compra.clickMatSelectProducto();
        compra.clickMatOptionProducto();
        compra.clickButtonCrearCompraForm();
        expect(detalleCliente.contarListaCompras()).toBeGreaterThan(listaComprasClienteAntes);
    });
});