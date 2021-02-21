import { element, by } from "protractor";
export class HomePage{
    private buttonCrearCliente = element(by.id('buttonCrearCliente'));
    private listaClientes = element.all(by.css('tbody.listaClientes tr'));
    private listaImagenesCliente = this.listaClientes.all(by.tagName('img'));
    async clickBotonCrearCliente(){
        await this.buttonCrearCliente.click();
    }

    async contarClientes(){
        return this.listaClientes.count();
    }

    async contarImagenesClientes(){
        return this.listaImagenesCliente.count();
        
    }

    async clickImagenPrimerCliente(){
        await this.listaImagenesCliente.get(0).click();
    }
}