import { element, by, $$ } from "protractor";

export class DetalleClientePage{

    private buttonCrearCompra = element.all(by.id('buttonCrearCompra'));
    private listaCompras = $$('tbody tr');
    private listaBotonesEliminar = this.listaCompras.all(by.css('button.btn-danger'));


    async clickBotonCrearCompra(){
        await this.buttonCrearCompra.click();
    }

    async contarListaCompras(){
        return this.listaCompras.count();
    }

    async clickEliminarPrimerCompra(){
        await this.listaBotonesEliminar.get(0).click();
    }
}

